import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public/dist directory
const staticPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

app.use(express.static(staticPath));

// API routes can be defined here before wildcard route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Server running on Vercel" });
});

// Handle client-side routing - serve index.html for all SPA routes
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Export default app for Vercel serverless runtime
export default app;