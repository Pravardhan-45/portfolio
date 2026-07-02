const previewService = require("../services/previewService");

/**
 * POST /api/preview
 *
 * Request Body:
 * {
 *   "template": "modern",
 *   "portfolio": { ... }
 * }
 */
async function generatePreview(req, res) {
    try {
        const { template, portfolio } = req.body;

        // Basic validation
        if (!template) {
            return res.status(400).json({
                success: false,
                message: "Template name is required.",
            });
        }

        if (!portfolio) {
            return res.status(400).json({
                success: false,
                message: "Portfolio data is required.",
            });
        }

        const result = await previewService.generatePreview(
            template,
            portfolio
        );

        return res.status(200).json(result);

    } catch (error) {
        console.error("Preview Error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to generate preview.",
        });
    }
}

/**
 * GET /api/preview/:projectId
 *
 * Serves the generated portfolio.
 */
async function servePreview(req, res) {
    try {
        const { projectId } = req.params;

        const previewPath =
            previewService.getPreviewPath(projectId);

        return res.sendFile(previewPath);

    } catch (error) {
        console.error("Serve Preview Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to serve preview.",
        });
    }
}

module.exports = {
    generatePreview,
    servePreview,
};