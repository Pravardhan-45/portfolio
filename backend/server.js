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

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize Auth & Portfolio Routes
const authRouter = createAuthRoutes({ express, mongoose, bcrypt, jwt });
const portfolioRouter = createPortfolioRoutes({ express, mongoose, jwt });

// Mount all routes
app.use("/api/auth", authRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/download", downloadRoutes);
app.use("/api/ai", aiRoutes);

const path = require("path");

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running on port ${PORT}`);
});
