const {
    generatePortfolio,
} = require("../../Generator/services/portfolioGenerator");

const {
    generateProjectFolderName,
} = require("../../Generator/utils/idGenerator");

const {
    createZip,
} = require("./zipService");

/**
 * Generates a standalone portfolio and
 * creates a downloadable ZIP.
 *
 * @param {string} templateName
 * @param {Object} portfolioData
 * @returns {Promise<Object>}
 */
async function generateDownload(
    templateName,
    portfolioData
) {
    try {

        // Generate unique project folder
        const projectFolderName =
            generateProjectFolderName();

        // Generate standalone portfolio
        const {
            generatedProjectPath,
            selectedTemplate,
            portfolioFile,
        } = await generatePortfolio({
            templateName,
            portfolioData,
            projectFolderName,
        });

        // Create ZIP
        const {
            zipName,
            zipPath,
            size,
        } = await createZip(
            generatedProjectPath
        );

        return {
            success: true,

            generatedProjectPath,

            portfolioFile,

            selectedTemplate,

            zipName,

            zipPath,

            size,
        };

    } catch (error) {

        console.error(
            "Download generation failed:",
            error
        );

        throw error;

    }
}

module.exports = {
    generateDownload,
};