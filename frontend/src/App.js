import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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

  // List of available metrics for comparison
  const metrics = [
    { key: 'followers', label: 'Followers', format: (value) => new Intl.NumberFormat().format(value) },
    { key: 'popularity', label: 'Popularity', format: (value) => `${value}/100` },
    { key: 'monthlyListeners', label: 'Monthly Listeners', format: (value) => new Intl.NumberFormat().format(value) },
  ];

  // Fetch initial artists on component mount
  useEffect(() => {
    fetchArtists();
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
        setPreviousArtist(response.data.artistA); // Set the first artist
        setCurrentArtist(response.data.artistB); // Set the second artist
      } else {
        setCurrentArtist(response.data.artistA); // Set the new artist
      }
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const formatMetricValue = (value, metricKey) => {
    const metric = metrics.find(m => m.key === metricKey);
    return metric ? metric.format(value) : value;
  };

  /**
   * Handles the user's guess (higher or lower).
   * @param {string} guess - The user's guess ('higher' or 'lower').
   */
  const handleGuess = (guess) => {
    const prevValue = previousArtist[comparisonMetric];
    const currValue = currentArtist[comparisonMetric];
    const isCorrect = guess === 'higher' ? currValue > prevValue : currValue < prevValue;

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
          }
        } else {
          setShowResult(false);
          setStreak(0);
          setPreviousArtist(null);
          setCurrentArtist(null);
          setShowMetric(false);
          fetchArtists();
        }
        setIsAnimating(false);
      }, 1000);
    }, 1500);
  };

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
        Streak: {streak} | High Score: {highScore}
      </div>

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
            <button onClick={() => handleGuess('lower')}>Lower</button>
            <button onClick={() => handleGuess('higher')}>Higher</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
