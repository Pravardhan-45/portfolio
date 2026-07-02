const express = require("express");
const router = express.Router();

const {
    generatePreview,
    servePreview,
} = require("../controllers/previewController");

/**
 * Generate Portfolio Preview
 *
 * POST /api/preview
 */
router.post("/", generatePreview);

/**
 * View Generated Portfolio
 *
 * GET /api/preview/:projectId
 */
router.get("/:projectId", servePreview);

module.exports = router;