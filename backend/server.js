require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import route factories and routers
const createAuthRoutes = require("./auth/routes/authRoutes");
const createPortfolioRoutes = require("./Portfolio/routes/portfolioRoutes");
const downloadRoutes = require("./Download/routes/downloadRoutes");
const aiRoutes = require("./AI-Integration/routes/aiRoutes");

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    // Allow localhost for development, and any vercel.app domain for production
    const allowed = /localhost|127\.0\.0\.1|vercel\.app/;
    if (allowed.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize Database connection
if (!process.env.MONGODB_URI) {
  console.error("CRITICAL ERROR: MONGODB_URI is not defined in environment variables!");
} else {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

// Initialize Auth & Portfolio Routes
const authRouter = createAuthRoutes({ express, mongoose, bcrypt, jwt });
const portfolioRouter = createPortfolioRoutes({ express, mongoose, jwt });

// Mount all routes
app.use("/api/auth", authRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/download", downloadRoutes);
app.use("/api/ai", aiRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Portfolio API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR] Error encountered:", err);
  res.status(500).json({ success: false, error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
