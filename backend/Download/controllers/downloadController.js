const downloadService = require("../services/downloadService");
const { cleanup } = require("../services/cleanupService");

/**
 * POST /api/download
 *
 * Body:
 * {
 *    "template":"modern",
 *    "portfolio":{...}
 * }
 */
async function downloadPortfolio(req, res) {
    try {

        const { template, portfolio } = req.body;

        if (!template) {
            return res.status(400).json({
                success: false,
                message: "Template is required."
            });
        }

        if (!portfolio) {
            return res.status(400).json({
                success: false,
                message: "Portfolio data is required."
            });
        }

        const result =
            await downloadService.generateDownload(
                template,
                portfolio
            );

        return res.download(
            result.zipPath,
            result.zipName,
            (err) => {
                // Remove the generated project folder and ZIP once the
                // download has finished (or failed) so they don't pile up.
                cleanup({
                    generatedProjectPath: result.generatedProjectPath,
                    zipPath: result.zipPath,
                });

                if (err && !res.headersSent) {
                    res.status(500).json({
                        success: false,
                        message: "Failed to download portfolio."
                    });
                }
            }
        );

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = {
    downloadPortfolio,
};