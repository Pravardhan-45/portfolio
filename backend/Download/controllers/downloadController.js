const downloadService = require("../services/downloadService");

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
            result.zipName
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