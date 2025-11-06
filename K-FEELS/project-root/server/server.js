import express from "express";
//const express = require('express');
import mongoose from "mongoose";
//const mongoose = require('mongoose');
import bodyParser from "body-parser";
//const bodyParser = require('body-parser');
import cors from "cors";
//const routes = require('./routes/index');
import router from "./routes/index.js";
import kDramaRouter from "./routes/kDramaRoutes.js";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI || 
  "mongodb+srv://guesooul_db_user:0NYKzxnGMcYZWRHO@dramadb.e9dlbow.mongodb.net/?appName=DramaDB";

// Middleware
// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
console.log("Attempting to connect to MongoDB...");
console.log("MongoDB URI:", MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Hide password in logs

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000,
    bufferMaxEntries: 0, // Disable mongoose buffering
    bufferCommands: false, // Disable mongoose buffering
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("Make sure your IP address is whitelisted in MongoDB Atlas");
    
    // Don't exit the process, let the server continue running
    // process.exit(1);
  });

// kDrama Routes
app.use("/api", router);
app.use("/api/kdramas", kDramaRouter);

// Auth Routes (mounted directly under /auth)
// Add MongoDB connection check middleware for auth routes
app.use("/auth", (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      error: "Database not available", 
      message: "Please try again in a moment. The database is still connecting." 
    });
  }
  next();
});
app.use("/auth", authRouter);

// Routes
app.use("/api", router); // This mounts all routes under /api prefix
app.get("/", (req, res) => {
  res.send("Hello from your server!");
});

// Health check endpoint
app.get("/health", (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const mongoStatusText = {
    0: "disconnected",
    1: "connected", 
    2: "connecting",
    3: "disconnecting"
  }[mongoStatus] || "unknown";

  res.json({
    status: "ok",
    mongodb: {
      status: mongoStatusText,
      readyState: mongoStatus
    },
    timestamp: new Date().toISOString()
  });
});

// Catch-all route for debugging
app.use((req, res) => {
  console.log("404 - Route not found:", req.method, req.url);
  res.status(404).json({
    error: "Route not found",
    method: req.method,
    url: req.url,
    availableRoutes: [
      "GET /api/moods",
      "POST /api/moods",
      "GET /api/moods/:id",
      "PUT /api/moods/:id",
      "DELETE /api/moods/:id",
      "POST /auth/register",
      "POST /auth/login",
      "POST /auth/logout",
    ],
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
