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
  const [isCorrectGuess, setIsCorrectGuess] = useState(false); // Tracks if the guess was correct

  // List of available metrics for comparison
  const metrics = [
    { key: 'followers', label: 'Followers' },
    { key: 'popularity', label: 'Popularity' },
    { key: 'monthlyListeners', label: 'Monthly Listeners' },
  ];

  // Fetch initial artists on component mount
  useEffect(() => {
    fetchArtists();
  }, []);

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

  /**
   * Handles the user's guess (higher or lower).
   * @param {string} guess - The user's guess ('higher' or 'lower').
   */
  const handleGuess = (guess) => {
    const isCorrect =
      guess === 'higher'
        ? currentArtist[comparisonMetric] > previousArtist[comparisonMetric]
        : currentArtist[comparisonMetric] < previousArtist[comparisonMetric];

    setShowMetric(true); // Show the metric after the guess
    setIsCorrectGuess(isCorrect); // Track if the guess was correct

    if (isCorrect) {
      setIsAnimating(true); // Start the slide animation
      setTimeout(() => {
        setStreak(streak + 1); // Increase the streak
        if (currentArtist[comparisonMetric] > previousArtist[comparisonMetric]) {
          setPreviousArtist(currentArtist); // Update the previous artist
        }
        setCurrentArtist(null); // Clear the current artist
        setShowMetric(false); // Hide the metric
        fetchArtists(); // Load new data during the animation
        setIsAnimating(false); // End the slide animation

        // Shake-up feature: switch metric every 3 correct answers
        if ((streak + 1) % 3 === 0) {
          const currentIndex = metrics.findIndex((m) => m.key === comparisonMetric);
          const nextIndex = (currentIndex + 1) % metrics.length;
          setComparisonMetric(metrics[nextIndex].key); // Update the comparison metric
        }
      }, 1000); // Wait for the slide animation to complete
    } else {
      setIsAnimating(true); // Start the slide animation
      setTimeout(() => {
        alert(`Game over! Your streak: ${streak}`);
        setStreak(0); // Reset the streak
        setPreviousArtist(null); // Reset the previous artist
        setCurrentArtist(null); // Reset the current artist
        setShowMetric(false); // Hide the metric
        fetchArtists(); // Fetch new artists
        setIsAnimating(false); // End the slide animation
      }, 1000); // Wait for the slide animation to complete
    }
  };

  if (!previousArtist || !currentArtist) return <div>Loading...</div>;

  return (
    <div className="game-container">
      {/* Left card: Previous artist/song (no animation) */}
      <div className="artist-card left">
        <img src={previousArtist.image} alt={previousArtist.name} />
        <div className="metric-overlay">
          {metrics.find((m) => m.key === comparisonMetric).label}
        </div>
        <h2>{previousArtist.name}</h2>
        {showMetric && <p className="fade-in">{previousArtist[comparisonMetric]}</p>}
      </div>

      {/* Right card: Current artist/song (with animation) */}
      <div className={`artist-card right ${isAnimating ? (isCorrectGuess ? 'slide-left' : 'slide-out-right') : ''}`}>
        <img src={currentArtist.image} alt={currentArtist.name} />
        <div className="buttons">
          <button onClick={() => handleGuess('lower')}>Lower</button>
          <button onClick={() => handleGuess('higher')}>Higher</button>
        </div>
        <h2>{currentArtist.name}</h2>
        {showMetric && <p className="fade-in">{currentArtist[comparisonMetric]}</p>}
      </div>

      {/* Streak counter */}
      <div className="streak">Streak: {streak}</div>
    </div>
  );
};

export default App;
