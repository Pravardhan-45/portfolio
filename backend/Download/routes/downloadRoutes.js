const express = require("express");
const router = express.Router();

const {
    downloadPortfolio,
} = require("../controllers/downloadController");

/**
 * Download Portfolio Source Code (ZIP)
 *
 * POST /api/download
 */
router.post("/", downloadPortfolio);

module.exports = router;