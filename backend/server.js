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
    'https://gabrielgiancarloportfolio-3.netlify.app/' 
  ],
  credentials: true
}));

app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

/**
 * Fetches a Spotify API token using client credentials.
 * @return {Promise<string>} The access token.
 */
const getToken = async () => {
  const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
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
 * Fetches a random artist from Spotify.
 * @param {string} token - Spotify API access token.
 * @return {Promise<Object>} A random artist object.
 */
const getRandomArtist = async (token) => {
  const offset = Math.floor(Math.random() * 1000); // Random offset for variety
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=genre:pop&type=artist&limit=1&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.artists.items[0];
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
    const artistA = await getRandomArtist(token); // Fetch a random artist
    const artistB = await getRandomArtist(token); // Fetch another random artist
    const detailsA = await getArtistDetails(token, artistA.id); // Get details for artist A
    const detailsB = await getArtistDetails(token, artistB.id); // Get details for artist B
    res.json({ artistA: detailsA, artistB: detailsB }); // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Failed to fetch artists' }); // Handle errors
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
