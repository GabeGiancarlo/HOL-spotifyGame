import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [artistA, setArtistA] = useState(null);
  const [artistB, setArtistB] = useState(null);
  const [streak, setStreak] = useState(0);
  const [comparisonMetric, setComparisonMetric] = useState('monthlyListeners');

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
      setArtistA(response.data.artistA);
      setArtistB(response.data.artistB);
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
        ? artistB[comparisonMetric] > artistA[comparisonMetric]
        : artistB[comparisonMetric] < artistA[comparisonMetric];

    if (isCorrect) {
      setStreak(streak + 1);
      setArtistA(artistB);
      fetchArtists();

      // Shake-up feature: switch metric every 3 correct answers
      if ((streak + 1) % 3 === 0) {
        setComparisonMetric(
          comparisonMetric === 'monthlyListeners' ? 'popularity' : 'monthlyListeners'
        );
      }
    } else {
      alert(`Game over! Your streak: ${streak}`);
      setStreak(0);
      fetchArtists();
    }
  };

  if (!artistA || !artistB) return <div>Loading...</div>;

  return (
    <div className="game-container">
      <div className="artist-card">
        <img src={artistA.image} alt={artistA.name} />
        <h2>{artistA.name}</h2>
        <p>{artistA[comparisonMetric]}</p>
      </div>
      <div className="artist-card">
        <img src={artistB.image} alt={artistB.name} />
        <h2>{artistB.name}</h2>
        <p>{artistB[comparisonMetric]}</p>
      </div>
      <div className="buttons">
        <button onClick={() => handleGuess('lower')}>Lower</button>
        <button onClick={() => handleGuess('higher')}>Higher</button>
      </div>
      <div className="streak">Streak: {streak}</div>
    </div>
  );
};

export default App;
