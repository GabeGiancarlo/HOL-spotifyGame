# Spotify Higher or Lower Game

A web-based guessing game that challenges players to predict whether an artist has higher or lower metrics (followers, popularity, monthly listeners) compared to a reference artist, using data from the Spotify API.

![Spotify Higher or Lower Game](https://via.placeholder.com/800x400?text=Spotify+Higher+or+Lower+Game)

## 📋 Overview

This interactive game presents players with two music artists from Spotify. The player must guess whether the second artist has higher or lower stats than the first one for various metrics like follower count, popularity score, or monthly listeners. Make correct guesses to build your streak!

### Game Features

- **Dynamic Artist Comparisons**: Random artist pairings for unlimited gameplay
- **Multiple Comparison Metrics**: Compare artists based on followers, popularity, or monthly listeners
- **Progressive Difficulty**: Metric changes every 3 correct answers to keep the game challenging
- **Streak Tracking**: Keep track of your consecutive correct guesses
- **Smooth Animations**: Visual feedback for correct and incorrect guesses

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spotify Developer Account and API credentials

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/spotify-higher-lower.git
   cd spotify-higher-lower
   ```

2. Install dependencies for both backend and frontend:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the backend directory with your Spotify API credentials:
   ```
   CLIENT_ID=your_spotify_client_id
   CLIENT_SECRET=your_spotify_client_secret
   ```

4. Start the backend server:
   ```
   cd backend
   node server.js
   ```

5. Start the frontend development server:
   ```
   cd ../frontend
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## 🎮 How to Play

1. You'll see two artists side by side with the metric being compared displayed
2. For the artist on the right, guess whether they have a higher or lower value for the displayed metric
3. Click "Higher" or "Lower" to make your guess
4. After each guess, the actual values will be revealed
5. If correct, your streak increases and a new artist appears
6. If incorrect, the game ends and your final streak is displayed

## 🛠️ Tech Stack

- **Frontend**: React.js with Hooks, CSS animations
- **Backend**: Node.js, Express
- **API**: Spotify Web API
- **Dependencies**: axios for API requests

## 📝 Project Structure

```
spotify-higher-lower/
├── backend/
│   ├── server.js         # Express server and Spotify API integration
│   └── package.json      # Backend dependencies
├── frontend/
│   ├── public/           # Static files
│   ├── src/
│   │   ├── App.js        # Main game component
│   │   ├── App.css       # Styling
│   │   └── index.js      # React entry point
│   └── package.json      # Frontend dependencies
└── README.md             # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the game.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for providing artist data
- Inspired by the [Higher or Lower Game](http://www.higherlowergame.com/)
