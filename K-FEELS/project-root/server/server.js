import express from 'express';
//const express = require('express');
import mongoose from 'mongoose';
//const mongoose = require('mongoose');
import bodyParser from 'body-parser';
//const bodyParser = require('body-parser');
//const routes = require('./routes/index');
import router from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5173;
const MONGODB_URI = 'mongodb+srv://guesooul_db_user:0NYKzxnGMcYZWRHO@dramadb.e9dlbow.mongodb.net/?appName=DramaDB';
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  // NOTE: consider moving the URI into an environment variable instead of hardcoding credentials
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', router);  // This mounts all routes under /api prefix
app.get('/', (req, res) => {
  res.send('Hello from your server!');
});

// Catch-all route for debugging
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.url);
  res.status(404).json({ 
    error: 'Route not found',
    method: req.method,
    url: req.url,
    availableRoutes: [
      'GET /api/moods',
      'POST /api/moods',
      'GET /api/moods/:id',
      'PUT /api/moods/:id',
      'DELETE /api/moods/:id'
    ]
  });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});