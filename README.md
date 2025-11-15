# Mood Tracker Application

## Overview
This project is a Mood Tracker application built with a React frontend and an Express backend. The application allows users to take a mood quiz, view their results, and save their favorite moods.

## Project Structure
```
K-FEELZ/
├── client/                # React frontend
│   ├── public/            # Public assets
│   ├── src/               # Source files for the React app
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Mood quiz, results, favorites
│   │   ├── features/      # Redux slices
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
   cd K-FEELZ
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
   npm run dev
   ```

2. Start the client:
   ```
   cd ../client
   npm run dev
   ```

### Usage
- Navigate to `http://localhost:5173` in your browser to access the application.
- Take the mood quiz, view your results, and manage your favorite moods.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.
