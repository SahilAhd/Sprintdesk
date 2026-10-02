import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable JSON middleware and CORS
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Basic Healthcheck Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Sprintdesk Backend API is running!" });
});

// Start Express Server
app.listen(PORT, async () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  await testConnection(); // Test MySQL connection on boot
});