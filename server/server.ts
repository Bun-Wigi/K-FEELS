import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index";
import kDramaRouter from "./routes/kDramaRoutes"
import authRouter from "./routes/authRoutes";

dotenv.config();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 5172;
const MONGODB_URI = process.env.MONGODB_URI || 
  "mongodb+srv://guesooul_db_user:0NYKzxnGMcYZWRHO@dramadb.e9dlbow.mongodb.net/?appName=DramaDB";

// Middleware - runs before all requests
// Updated CORS configuration to fix the credentials issue
app.use(cors({
  origin: 'http://localhost:5173', // Specific origin instead of wildcard
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie']
}));

app.use(bodyParser.json());  // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Debug middleware - logs every request
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB database
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api", router); 
app.use("/api/auth", authRouter);  
app.use("/api", kDramaRouter);

// Serve static files in production mode
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));
  
  // Serve index.html for all other routes (React Router)
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  // Development mode - API only
  app.get("/", (_req: Request, res: Response) => {
    res.json({
      message: "K-FEELZ API Server is running",
      mode: "development",
      note: "Run 'npm run dev' in /client for frontend with HMR"
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});