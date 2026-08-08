import express from "express";

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Backend API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Server running on Vercel" });
});

// Export Express app instance for Vercel Serverless execution
export default app;