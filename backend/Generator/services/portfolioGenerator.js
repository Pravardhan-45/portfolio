const path = require("path");
const {
    pathExists,
    copyDirectory,
    ensureDirectoryExists,
    joinPath,
} = require("../utils/fileUtils");

/**
 * Copies the selected template into the generated folder.
 *
 * @param {string} templateName
 * @param {string} projectFolderName
 * @returns {Promise<string>} Generated project path
 */
async function copyTemplate(templateName, projectFolderName) {
    // Path to frontend templates
    const templatesRoot = path.resolve(
        __dirname,
        "../../../frontend/templates"
    );

    // Source template path
    const templatePath = joinPath(templatesRoot, templateName);

    // Check template exists
    if (!(await pathExists(templatePath))) {
        throw new Error(`Template "${templateName}" does not exist.`);
    }

    // Generator/generated
    const generatedRoot = path.resolve(
        __dirname,
        "../generated"
    );

    // Ensure generated folder exists
    await ensureDirectoryExists(generatedRoot);

    // Destination folder
    const destinationPath = joinPath(
        generatedRoot,
        projectFolderName
    );

    // Copy template
    await copyDirectory(templatePath, destinationPath);

    return destinationPath;
}

/**
 * Returns all available templates.
 *
 * Useful for validation or future APIs.
 */
async function getAvailableTemplates() {
    const fs = require("fs-extra");

    const templatesRoot = path.resolve(
        __dirname,
        "../../../frontend/templates"
    );

    if (!(await fs.pathExists(templatesRoot))) {
        return [];
    }

    const files = await fs.readdir(templatesRoot);

    return files;
}

module.exports = {
    copyTemplate,
    getAvailableTemplates,
};