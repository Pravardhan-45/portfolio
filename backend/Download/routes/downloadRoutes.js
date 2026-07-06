const express = require("express");

const router = express.Router();

const {
    downloadPortfolio,
} = require("../controllers/downloadController");

/**
 * Generate and download standalone portfolio
 *
 * POST /api/download
 *
 * Request Body:
 * {
 *   "template": "modern",
 *   "portfolio": { ... }
 * }
 */
router.post("/", downloadPortfolio);

module.exports = router;