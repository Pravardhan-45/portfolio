const path = require("path");
const fs = require("fs-extra");

/**
 * Generates src/data/portfolio.js
 * inside the generated standalone portfolio project.
 *
 * @param {string} generatedProjectPath
 * @param {Object} portfolioData
 * @returns {Promise<string>}
 */
async function injectPortfolioData(
    generatedProjectPath,
    portfolioData
) {
    const dataFolder = path.join(
        generatedProjectPath,
        "src",
        "data"
    );

    await fs.ensureDir(dataFolder);

    const portfolioFile = path.join(
        dataFolder,
        "portfolio.js"
    );

    const fileContent = `const portfolio = ${JSON.stringify(
        portfolioData,
        null,
        2
    )};

export default portfolio;
`;

    await fs.writeFile(
        portfolioFile,
        fileContent,
        "utf8"
    );

    return portfolioFile;
}

module.exports = {
    injectPortfolioData,
};