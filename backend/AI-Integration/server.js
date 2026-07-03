require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getAuthConfig = require("../auth/config/authConfig");
const connectDatabase = require("../auth/config/database");
const createAuthRoutes = require("../auth/routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    "/api/auth",
    createAuthRoutes({
        express,
        mongoose,
        bcrypt,
        jwt
    })
);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    getAuthConfig();
    await connectDatabase(mongoose);

    return app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

if (require.main === module) {
    startServer().catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
}

module.exports = {
    app,
    startServer
};
