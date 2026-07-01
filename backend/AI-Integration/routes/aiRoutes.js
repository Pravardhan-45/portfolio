const express = require("express");

const router = express.Router();

const {
    analyzePortfolio
} = require("../controllers/aiController");

router.post("/analyze", analyzePortfolio);

module.exports = router;