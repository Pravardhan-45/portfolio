const { prepareProject } = require("./templateService");
const { injectPortfolioData } = require("./dataInjector");

/**
 * Generates a standalone portfolio project.
 *
 * Workflow:
 * 1. Copy starter project.
 * 2. Keep only selected template.
 * 3. Generate portfolio.js with user data.
 *
 * @param {Object} options
 * @param {string} options.templateName
 * @param {Object} options.portfolioData
 * @param {string} options.projectFolderName
 *
 * @returns {Promise<Object>}
 */
async function generatePortfolio({
    templateName,
    portfolioData,
    projectFolderName,
}) {
    try {
        // Copy starter and setup selected template
        const {
            generatedProjectPath,
            selectedTemplate,
        } = await prepareProject(
            templateName,
            projectFolderName
        );

        // Make sure template is also stored in portfolio data
        portfolioData.template = templateName.toLowerCase();

        // Generate src/data/portfolio.js
        const portfolioFile =
            await injectPortfolioData(
                generatedProjectPath,
                portfolioData
            );

        return {
            success: true,
            generatedProjectPath,
            selectedTemplate,
            portfolioFile,
        };
    } catch (error) {
        console.error(
            "Portfolio generation failed:",
            error
        );

        throw error;
    }
}

module.exports = {
    generatePortfolio,
};