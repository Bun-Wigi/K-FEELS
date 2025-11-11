import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import kDramaRouter from "./routes/kDramaRoutes.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5172;
const MONGODB_URI = process.env.MONGODB_URI || 
  "mongodb+srv://guesooul_db_user:0NYKzxnGMcYZWRHO@dramadb.e9dlbow.mongodb.net/?appName=DramaDB";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes (must come before static files)
app.use("/api", router);
app.use("/api/auth", authRouter);
app.use("/api/kdramas", kDramaRouter);

// Serve static files from React build (production mode)
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));
  
  // Catch-all route for client-side routing (React Router)
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  // Development mode - API only
  app.get("/", (req, res) => {
    res.json({
      message: "K-FEELZ API Server is running",
      mode: "development",
      note: "Run 'npm run dev' in /client for frontend with HMR"
    });
  });

  // Catch-all route for debugging in dev mode
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
        "POST /api/auth/register",
        "POST /api/auth/login",
        "POST /api/auth/logout",
        "GET /api/kdramas",
      ],
    });
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
