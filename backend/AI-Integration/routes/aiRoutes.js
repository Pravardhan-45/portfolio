const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const {
    analyzePortfolio
} = require("../controllers/aiController");

router.post("/analyze", upload.single("jdFile"), analyzePortfolio);

module.exports = router;