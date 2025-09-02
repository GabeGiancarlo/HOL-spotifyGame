const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://gabrielgiancarloportfolio-3.netlify.app'
  ],
  credentials: true
}));

app.use(express.json());

// Spotify API configuration
const SPOTIFY_CLIENT_ID = process.env.CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.CLIENT_SECRET;

/**
 * Fetches a Spotify API token using client credentials.
 * @return {Promise<string>} The access token.
 */
const getToken = async () => {
  const authString = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
};

/**
 * Fetches a random artist from Spotify with better filtering for recognizable artists.
 * @param {string} token - Spotify API access token.
 * @param {string} genre - The genre of the artist.
 * @return {Promise<Object>} A random artist object.
 */
const getRandomArtist = async (token, genre = 'pop') => {
  // Try multiple attempts to find a recognizable artist
  for (let attempt = 0; attempt < 5; attempt++) {
    const offset = Math.floor(Math.random() * 500); // Reduced offset range for better quality
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=genre:${genre}&type=artist&limit=20&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    // Filter artists by popularity and followers to get more recognizable ones
    const artists = response.data.artists.items.filter(artist => {
      // Must have an image
      if (!artist.images || artist.images.length === 0) return false;
      
      // Must have reasonable popularity (at least 20/100)
      if (artist.popularity < 20) return false;
      
      // Must have reasonable follower count (at least 10,000 followers)
      if (artist.followers.total < 10000) return false;
      
      return true;
    });
    
    // If we found suitable artists, return a random one
    if (artists.length > 0) {
      return artists[Math.floor(Math.random() * artists.length)];
    }
  }
  
  // Fallback: if no suitable artists found, get any artist with an image
  const fallbackResponse = await axios.get(
    `https://api.spotify.com/v1/search?q=genre:${genre}&type=artist&limit=1&offset=${Math.floor(Math.random() * 100)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return fallbackResponse.data.artists.items[0];
};

/**
 * Fetches detailed information about an artist.
 * @param {string} token - Spotify API access token.
 * @param {string} artistId - The ID of the artist.
 * @return {Promise<Object>} Artist details (name, image, and metrics).
 */
const getArtistDetails = async (token, artistId) => {
  const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    name: artistResponse.data.name,
    image: artistResponse.data.images[0]?.url || 'default_image_url',
    followers: artistResponse.data.followers.total, // Total followers
    popularity: artistResponse.data.popularity, // Artist popularity (0-100)
    monthlyListeners: artistResponse.data.followers.total, // Simulated monthly listeners (using followers)
  };
};

/**
 * Endpoint to fetch two random artists for comparison.
 */
app.get('/api/artists', async (req, res) => {
  try {
    const token = await getToken(); // Get Spotify API token
    const genre = req.query.genre || 'pop'; // Get genre from query parameter, default to 'pop'
    
    // Fetch multiple artists to find a good pair with meaningful differences
    let bestPair = null;
    let maxDifference = 0;
    
    // Try up to 10 times to find a good pair
    for (let attempt = 0; attempt < 10; attempt++) {
      const artistA = await getRandomArtist(token, genre);
      const artistB = await getRandomArtist(token, genre);
      
      if (!artistA || !artistB) continue;
      
      const detailsA = await getArtistDetails(token, artistA.id);
      const detailsB = await getArtistDetails(token, artistB.id);
      
      // Calculate the difference in followers (our main metric)
      const difference = Math.abs(detailsA.followers - detailsB.followers);
      const minDifference = Math.max(detailsA.followers, detailsB.followers) * 0.1; // At least 10% difference
      
      // If this pair has a better difference and meets minimum threshold, use it
      if (difference > maxDifference && difference >= minDifference) {
        maxDifference = difference;
        bestPair = { artistA: detailsA, artistB: detailsB };
      }
      
      // If we found a really good pair, break early
      if (difference >= minDifference * 2) {
        bestPair = { artistA: detailsA, artistB: detailsB };
        break;
      }
    }
    
    // If no good pair found, use the last attempt
    if (!bestPair) {
      const artistA = await getRandomArtist(token, genre);
      const artistB = await getRandomArtist(token, genre);
      const detailsA = await getArtistDetails(token, artistA.id);
      const detailsB = await getArtistDetails(token, artistB.id);
      bestPair = { artistA: detailsA, artistB: detailsB };
    }
    
    res.json(bestPair); // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Failed to fetch artists' }); // Handle errors
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
