const { generatePortfolio } = require("../../Generator/services/portfolioGenerator");
const { createZip } = require("./zipService");

/**
 * Generates a portfolio project and creates a ZIP archive.
 *
 * @param {string} templateName
 * @param {Object} portfolioData
 * @returns {Promise<Object>}
 */
async function generateDownload(templateName, portfolioData) {
    try {
        // Generate portfolio project
        const {
            projectId,
            generatedPath,
        } = await generatePortfolio(
            templateName,
            portfolioData
        );

        // Create ZIP archive
        const {
            zipName,
            zipPath,
            size,
        } = await createZip(
            projectId,
            generatedPath
        );

        return {
            success: true,
            projectId,
            zipName,
            zipPath,
            size,
        };

    } catch (error) {
        throw new Error(
            `Download generation failed: ${error.message}`
        );
    }
}

module.exports = {
    generateDownload,
};