# 🎵 Spotify Higher or Lower Game

A modern, interactive web application that challenges players to compare Spotify artists' metrics. Built with React and Node.js, this project showcases full-stack development skills, API integration, and modern UI/UX design principles.

![Spotify Higher or Lower Game]

## 🎯 Project Overview

This portfolio project demonstrates proficiency in:
- Modern React development with Hooks and state management
- RESTful API integration with the Spotify Web API
- Responsive design and fluid animations
- Clean, maintainable code architecture
- User experience optimization

### ✨ Key Features

- **Dynamic Data Integration**: Real-time artist comparisons using Spotify's API
- **Intelligent Game Logic**: Progressive difficulty system that adapts to player performance
- **Polished UI/UX**: 
  - Spotify-themed design language
  - Smooth transitions and animations
  - Responsive layout for all devices
  - Interactive tutorials for new users
- **Performance Optimization**: 
  - Efficient state management
  - Optimized API calls
  - Debounced user interactions
- **Local Storage Integration**: Persistent high scores and user preferences

## 🚀 Technical Implementation

### Architecture

```
HOL-spotifyGame/
├── backend/
│   ├── server.js         # Express server, Spotify API integration
│   └── package.json      # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js        # Core game logic and React components
│   │   ├── App.css       # Styled components and animations
│   │   └── index.js      # React entry point
│   └── package.json      # Frontend dependencies
└── README.md
```

### Tech Stack

- **Frontend**:
  - React 18 with Hooks
  - Modern CSS3 with custom animations
  - Responsive design principles
  - LocalStorage for data persistence

- **Backend**:
  - Node.js with Express
  - RESTful API architecture
  - Spotify Web API integration
  - Environment variable configuration

- **Development Tools**:
  - Git for version control
  - npm for package management
  - ESLint for code quality
  - Cross-platform compatibility

## 🎮 Gameplay Features

### Smart Difficulty Progression
- Metric changes every 3 correct answers
- Smooth transition animations
- Visual feedback for user actions

### User Experience
- First-time user tutorial
- Intuitive UI with clear feedback
- Engaging animations and transitions
- Error handling and recovery

### Performance Features
- Optimized API calls
- Smooth state transitions
- Debounced user interactions
- Responsive across devices

## 🛠️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GabeGiancarlo/HOL-spotifyGame.git
   cd HOL-spotifyGame
   ```

2. Install dependencies:
   ```bash
   # Backend setup
   cd backend
   npm install

   # Frontend setup
   cd ../frontend
   npm install
   ```

3. Configure environment:
   ```bash
   # In backend/.env
   CLIENT_ID=your_spotify_client_id
   CLIENT_SECRET=your_spotify_client_secret
   ```

4. Start the servers:
   ```bash
   # Start backend (port 5001)
   cd backend
   npm start

   # Start frontend (port 3000)
   cd ../frontend
   npm start
   ```

## 💡 Development Highlights

- **State Management**: Efficient React state handling with hooks
- **API Integration**: Secure Spotify API implementation
- **Animation System**: Custom CSS animations for smooth transitions
- **Error Handling**: Robust error management and recovery
- **Performance**: Optimized rendering and API calls
- **Accessibility**: Keyboard navigation and screen reader support

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📫 Contact & Connect

- LinkedIn: [Gabe Giancarlo](https://www.linkedin.com/in/gabe-giancarlo-25a395255)
- GitHub: [@GabeGiancarlo](https://github.com/GabeGiancarlo)
- Portfolio: [Coming Soon]

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for providing the artist data
- Inspired by [Higher Lower Game](http://www.higherlowergame.com/)
- Special thanks to the React and Node.js communities for their excellent documentation and resources
