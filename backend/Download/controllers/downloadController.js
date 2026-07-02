const path = require("path");
const downloadService = require("../services/downloadService");

/**
 * POST /api/download
 *
 * Request Body:
 * {
 *   "template": "modern",
 *   "portfolio": { ... }
 * }
 */
async function downloadPortfolio(req, res) {
    try {
        const { template, portfolio } = req.body;

        // Validate request
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

        // Generate ZIP
        const result = await downloadService.generateDownload(
            template,
            portfolio
        );

        // Send ZIP file
        return res.download(
            result.zipPath,
            result.zipName,
            (err) => {
                if (err) {
                    console.error("Download Error:", err);

                    if (!res.headersSent) {
                        res.status(500).json({
                            success: false,
                            message: "Failed to download portfolio.",
                        });
                    }
                }
            }
        );

    } catch (error) {
        console.error("Download Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}

module.exports = {
    downloadPortfolio,
};