#!/bin/bash

echo "Setting up environment variables for Spotify Game Backend"
echo "======================================================"
echo ""

# Check if .env already exists
if [ -f ".env" ]; then
    echo "Warning: .env file already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

echo "Please enter your Spotify API credentials:"
echo ""

# Get Client ID
read -p "Spotify Client ID: " CLIENT_ID
if [ -z "$CLIENT_ID" ]; then
    echo "Error: Client ID is required"
    exit 1
fi

# Get Client Secret
read -p "Spotify Client Secret: " CLIENT_SECRET
if [ -z "$CLIENT_SECRET" ]; then
    echo "Error: Client Secret is required"
    exit 1
fi

# Get Port (optional, with default)
read -p "Port (default: 5001): " PORT
PORT=${PORT:-5001}

# Create .env file
cat > .env << EOF
# Spotify API Credentials
CLIENT_ID=$CLIENT_ID
CLIENT_SECRET=$CLIENT_SECRET

# Server Configuration
PORT=$PORT
EOF

echo ""
echo "✅ .env file created successfully!"
echo "You can now run 'npm start' to start the server."
echo ""
echo "Note: Make sure to add http://localhost:$PORT to your Spotify app's redirect URIs"
echo "in the Spotify Developer Dashboard."
