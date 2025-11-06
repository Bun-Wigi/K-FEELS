# Mood Tracker Application

## Overview
This project is a Mood Tracker application built with a React frontend and an Express backend. The application allows users to take a mood quiz, view their results, and save their favorite moods.

## Project Structure
```
project-root/
├── client/                # React frontend
│   ├── public/            # Public assets
│   │   └── index.html     # Main HTML file
│   ├── src/               # Source files for the React app
│   │   ├── app/           # Redux store setup
│   │   ├── features/      # Redux slices
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Mood quiz, results, favorites
│   │   ├── hooks/         # Custom hooks (e.g., useAuth)
│   │   └── utils/         # Utility functions
│   └── package.json       # Client package configuration
│
├── server/                # Express backend
│   ├── routes/            # API routes
│   ├── controllers/       # Request handlers
│   ├── models/            # Mongoose schemas
│   ├── middleware/        # Middleware functions
│   ├── server.js          # Entry point for the server
│   └── package.json       # Server package configuration
│
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd project-root
   ```

2. Install dependencies for the client:
   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```
   cd ../server
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   cd server
   node server.js
   ```

2. Start the client:
   ```
   cd ../client
   npm start
   ```

### Usage
- Navigate to `http://localhost:3000` in your browser to access the application.
- Take the mood quiz, view your results, and manage your favorite moods.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.