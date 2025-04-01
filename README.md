# 🎵 Spotify Higher or Lower Game

A modern, interactive web application that challenges players to guess which Spotify artist has higher or lower metrics. Built with React and Node.js, this game demonstrates full-stack development skills and API integration.

## 🌟 Key Features

- **Interactive Gameplay**: Compare Spotify artists based on followers, popularity, and monthly listeners
- **Responsive Design**: Fully responsive layout that works on all devices
- **Real-time Updates**: Live feedback on guesses and streak tracking
- **Dynamic Metrics**: Changes between different Spotify metrics every 3 correct guesses
- **User Experience**: 
  - Tutorial modal for first-time users
  - Smooth animations and transitions
  - High score tracking
  - Guess history
  - Mobile-optimized interface

## 🛠️ Technical Implementation

### Frontend
- React.js for UI components
- CSS3 with modern animations and transitions
- Responsive design with mobile-first approach
- Environment-based configuration
- SVG favicon and web manifest

### Backend
- Node.js with Express
- Spotify Web API integration
- CORS configuration for secure API access
- Environment variable management

## 🎮 Gameplay Features

- **Multiple Metrics**:
  - Followers count
  - Popularity score (0-100)
  - Monthly listeners
- **Scoring System**:
  - Streak counter
  - High score tracking
  - Local storage persistence
- **Visual Feedback**:
  - Correct/incorrect animations
  - Metric change alerts
  - Smooth card transitions

## 🚀 Live Demo

Play the game at: [Spotify Higher or Lower](https://gabrielgiancarloportfolio-3.netlify.app)

## 🛠️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GabeGiancarlo/HOL-spotifyGame.git
   cd HOL-spotifyGame
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create `.env` file in the backend directory:
     ```
     CLIENT_ID=your_spotify_client_id
     CLIENT_SECRET=your_spotify_client_secret
     ```
   - Create `.env` file in the frontend directory:
     ```
     REACT_APP_API_URL=http://localhost:5001
     ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend server
   cd frontend
   npm start
   ```

## 💻 Development Highlights

- **Code Organization**:
  - Modular component structure
  - Clean separation of concerns
  - Reusable utility functions
- **Performance Optimizations**:
  - Efficient state management
  - Optimized animations
  - Responsive image loading
- **User Experience**:
  - Intuitive interface
  - Clear feedback system
  - Smooth transitions
  - Mobile-first design

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please reach out through GitHub issues or email.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Spotify Web API for providing artist data
- React.js community for excellent documentation and tools
- All contributors and users of the application
