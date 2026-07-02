const path = require("path");
const {
    pathExists,
    writeJSON,
} = require("../utils/fileUtils");

/**
 * Injects user portfolio data into the generated template.
 *
 * Expected template structure:
 *
 * src/
 *   data/
 *      portfolio.json
 *
 * @param {string} generatedProjectPath
 * @param {Object} portfolioData
 * @returns {Promise<string>}
 */
async function injectPortfolioData(generatedProjectPath, portfolioData) {
    const portfolioFilePath = path.join(
        generatedProjectPath,
        "src",
        "data",
        "portfolio.json"
    );

    // Ensure the template contains portfolio.json
    if (!(await pathExists(portfolioFilePath))) {
        throw new Error(
            `portfolio.json not found at ${portfolioFilePath}`
        );
    }

    // Replace demo data with user's portfolio
    await writeJSON(portfolioFilePath, portfolioData);

    return portfolioFilePath;
}

module.exports = {
    injectPortfolioData,
};