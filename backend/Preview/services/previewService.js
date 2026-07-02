const path = require("path");
const { generatePortfolio } = require("../../Generator/services/portfolioGenerator");

/**
 * Generates a portfolio preview.
 *
 * @param {string} templateName
 * @param {Object} portfolioData
 * @returns {Promise<Object>}
 */
async function generatePreview(templateName, portfolioData) {
    try {
        // Generate portfolio project
        const result = await generatePortfolio(
            templateName,
            portfolioData
        );

        const { projectId, generatedPath } = result;

        // Preview URL
        const previewUrl = `/preview/${projectId}`;

        return {
            success: true,
            projectId,
            previewUrl,
            generatedPath,
        };
    } catch (error) {
        throw new Error(
            `Preview generation failed: ${error.message}`
        );
    }
}

/**
 * Returns the absolute path of a generated project.
 *
 * Used by the preview controller to serve static files.
 *
 * @param {string} projectId
 * @returns {string}
 */
function getPreviewPath(projectId) {
    return path.join(
        __dirname,
        "../../Generator/generated",
        `project_${projectId}`
    );
}

module.exports = {
    generatePreview,
    getPreviewPath,
};