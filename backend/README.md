# Spotify Game Backend

This is the backend server for the Spotify Higher or Lower game.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the backend directory with the following variables:
   ```
   CLIENT_ID=your_spotify_client_id_here
   CLIENT_SECRET=your_spotify_client_secret_here
   PORT=5001
   ```

   **To get Spotify API credentials:**
   1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   2. Create a new app
   3. Copy the Client ID and Client Secret
   4. Add `http://localhost:5001` to your app's redirect URIs

3. **Run the server:**
   ```bash
   npm start
   ```

## Features

- **Better Artist Selection**: Artists are now filtered by popularity (≥20/100) and followers (≥10,000) to ensure more recognizable artists
- **Meaningful Comparisons**: The API tries to find artist pairs with at least 10% difference in metrics for better gameplay
- **Fallback Handling**: If no suitable artists are found, falls back to any available artist with an image

## API Endpoints

- `GET /api/artists?genre={genre}` - Returns two random artists for comparison
  - `genre` (optional): The music genre to filter by (default: 'pop')
  - Returns: `{ artistA: {...}, artistB: {...} }`

## Security Notes

- The `.env` file is already in `.gitignore` to prevent API keys from being committed
- API keys cannot be abused by others as they're tied to your Spotify app
- Consider using environment variables in production deployments
