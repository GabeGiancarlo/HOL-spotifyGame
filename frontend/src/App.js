import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Set up axios with base URL from environment variable
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const App = () => {
  const [previousArtist, setPreviousArtist] = useState(null); // Stores the previous artist/song
  const [currentArtist, setCurrentArtist] = useState(null); // Stores the current artist/song
  const [streak, setStreak] = useState(0); // Tracks the number of correct guesses in a row
  const [comparisonMetric, setComparisonMetric] = useState('followers'); // Current comparison metric
  const [showMetric, setShowMetric] = useState(false); // Controls whether the metric is displayed
  const [isAnimating, setIsAnimating] = useState(false); // Controls the slide animation
  const [isCorrectGuess, setIsCorrectGuess] = useState(null); // Tracks if the guess was correct
  const [showResult, setShowResult] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showMetricChange, setShowMetricChange] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [guessHistory, setGuessHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isGuessing, setIsGuessing] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // List of available metrics for comparison
  const metrics = [
    { key: 'followers', label: 'Followers', format: (value) => new Intl.NumberFormat().format(value) },
    { key: 'popularity', label: 'Popularity', format: (value) => `${value}/100` },
    { key: 'monthlyListeners', label: 'Monthly Listeners', format: (value) => new Intl.NumberFormat().format(value) },
  ];

  // Move fetchArtists inside useEffect to avoid the dependency warning
  useEffect(() => {
    // Check if this is the first visit
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
      return; // Don't fetch artists until tutorial is dismissed
    }

    const fetchInitialArtists = async () => {
      try {
        const response = await axios.get('/api/artists');
        setPreviousArtist(response.data.artistA);
        setCurrentArtist(response.data.artistB);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchInitialArtists();
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    if (streak > highScore) {
      setHighScore(streak);
      localStorage.setItem('highScore', streak.toString());
    }
  }, [streak, highScore]);

  /**
   * Fetches two random artists from the backend.
   */
  const fetchArtists = async () => {
    try {
      const response = await axios.get('/api/artists');
      if (!previousArtist) {
        setPreviousArtist(response.data.artistA);
        setCurrentArtist(response.data.artistB);
      } else {
        setCurrentArtist(response.data.artistA);
      }
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const formatMetricValue = (value, metricKey) => {
    const metric = metrics.find(m => m.key === metricKey);
    return metric ? metric.format(value) : value;
  };

  const handlePlayAgain = async () => {
    try {
      const response = await axios.get('/api/artists');
      setShowGameOver(false);
      setStreak(0);
      setShowMetric(false);
      setGuessHistory([]);
      setShowHistory(false);
      setPreviousArtist(response.data.artistA);
      setCurrentArtist(response.data.artistB);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const handleStartGame = async () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenTutorial', 'true');
    
    // Fetch initial artists after tutorial is dismissed
    try {
      const response = await axios.get('/api/artists');
      setPreviousArtist(response.data.artistA);
      setCurrentArtist(response.data.artistB);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  /**
   * Handles the user's guess (higher or lower).
   * @param {string} guess - The user's guess ('higher' or 'lower').
   */
  const handleGuess = (guess) => {
    if (isGuessing) return; // Prevent double-clicks
    setIsGuessing(true);

    const prevValue = previousArtist[comparisonMetric];
    const currValue = currentArtist[comparisonMetric];
    const isCorrect = guess === 'higher' ? currValue > prevValue : currValue < prevValue;

    // Add to guess history
    const historyEntry = {
      artist1: previousArtist.name,
      artist2: currentArtist.name,
      metric: currentMetric.label,
      guess,
      isCorrect,
      value1: formatMetricValue(prevValue, comparisonMetric),
      value2: formatMetricValue(currValue, comparisonMetric)
    };
    setGuessHistory(prev => [...prev, historyEntry]);

    setShowMetric(true);
    setIsCorrectGuess(isCorrect);
    setShowResult(true);

    setTimeout(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        if (isCorrect) {
          setStreak(streak + 1);
          setPreviousArtist(currentArtist);
          setCurrentArtist(null);
          setShowMetric(false);
          setShowResult(false);
          fetchArtists();

          if ((streak + 1) % 3 === 0) {
            const currentIndex = metrics.findIndex((m) => m.key === comparisonMetric);
            const nextIndex = (currentIndex + 1) % metrics.length;
            setComparisonMetric(metrics[nextIndex].key);
            setShowMetricChange(true);
            setTimeout(() => setShowMetricChange(false), 5000);
          }
        } else {
          setFinalScore(streak);
          setShowGameOver(true);
          setShowResult(false);
        }
        setIsAnimating(false);
        setIsGuessing(false);
      }, 1000);
    }, 1500);
  };

  if (showTutorial) {
    return (
      <div className="game-container">
        <div className="tutorial-modal">
          <h2>How to Play</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div>Compare two Spotify artists based on different metrics (Followers, Popularity, Monthly Listeners)</div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div>Guess if the second artist has higher or lower numbers than the first artist</div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div>Build your streak by making correct guesses</div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div>Every 3 correct guesses, the comparison metric changes</div>
            </div>
          </div>
          <button onClick={handleStartGame}>Start Playing!</button>
        </div>
      </div>
    );
  }

  if (!previousArtist || !currentArtist) return (
    <div className="game-container">
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    </div>
  );

  const currentMetric = metrics.find((m) => m.key === comparisonMetric);

  return (
    <div className="game-container">
      <div className={`streak ${streak > 0 && streak % 5 === 0 ? 'milestone' : ''}`}>
        Streak: <span className="highlight">{streak}</span> | High Score: <span className="highlight">{highScore}</span>
      </div>

      {showMetricChange && (
        <div className="metric-change-alert">
          New Category!
          <div className="category-text">
            {currentMetric.label}
          </div>
        </div>
      )}

      <div className="artist-card left">
        <img src={previousArtist.image} alt={previousArtist.name} />
        <div className="metric-overlay">
          {currentMetric.label}:
          {showMetric && (
            <span className="fade-in">
              {' '}{formatMetricValue(previousArtist[comparisonMetric], comparisonMetric)}
            </span>
          )}
        </div>
        <h2>{previousArtist.name}</h2>
      </div>

      <div className="versus-indicator">VS</div>

      <div className={`artist-card right ${isAnimating ? (isCorrectGuess ? 'slide-left' : 'slide-out-right') : ''}`}>
        <img src={currentArtist.image} alt={currentArtist.name} />
        {showResult && (
          <div className={`result-overlay ${isCorrectGuess ? 'correct' : 'incorrect'}`}>
            {isCorrectGuess ? '✓' : '✗'}
          </div>
        )}
        <div className="metric-overlay">
          {currentMetric.label}:
          {showMetric && (
            <span className="fade-in">
              {' '}{formatMetricValue(currentArtist[comparisonMetric], comparisonMetric)}
            </span>
          )}
        </div>
        <h2>{currentArtist.name}</h2>
        {!showMetric && (
          <div className="buttons">
            <button 
              onClick={() => handleGuess('lower')} 
              disabled={isGuessing}
            >
              Lower
            </button>
            <button 
              onClick={() => handleGuess('higher')} 
              disabled={isGuessing}
            >
              Higher
            </button>
          </div>
        )}
      </div>

      {showGameOver && (
        <div className="game-over-modal">
          <h2>Game Over!</h2>
          <p>Your final score:</p>
          <div className="score">{finalScore}</div>
          <div className="action-buttons">
            <button className="play-again" onClick={handlePlayAgain}>
              Play Again
            </button>
            <button className="history" onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          </div>
          {showHistory && (
            <div className="guess-history">
              {guessHistory.map((entry, index) => (
                <div key={index} className={`history-entry ${entry.isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="history-artists">
                    {entry.artist1} vs {entry.artist2}
                  </div>
                  <div className="history-details">
                    {entry.metric}: {entry.value1} vs {entry.value2}
                  </div>
                  <div className="history-guess">
                    Guessed: {entry.guess} ({entry.isCorrect ? '✓' : '✗'})
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="social-section">
            <p className="connect-text">Connect with me to view more projects:</p>
            <div className="social-links">
              <a 
                href="https://www.linkedin.com/in/gabe-giancarlo-25a395255" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/GabeGiancarlo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

