import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import router from "./routes/index.js";
import kDramaRouter from "./routes/kDramaRoutes.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 5172;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("Missing MONGODB_URI in .env");
if (!PORT) throw new Error("Missing PORT in .env");

// Middleware - runs before all requests
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Debug middleware - logs every request
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  }
};
connectDB();

// API Routes
app.use("/api", router); // Mood routes
app.use("/api/auth", authRouter); // Auth routes (login, register, logout)
app.use("/api/kdramas", kDramaRouter); // K-drama routes

// Serve static files in production mode
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientBuildPath));

  // Serve index.html for all other routes (React Router)
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
} else {
  // Development mode - API only
  app.get("/", (_req: Request, res: Response) => {
    res.json({
      message: "K-FEELZ API Server is running",
      mode: "development",
      note: "Run 'npm run dev' in /client for frontend with HMR",
    });
  });

  // 404 handler for development
  app.use((req: Request, res: Response) => {
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

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Global error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: err.message || err,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
