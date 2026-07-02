const path = require("path");
const {
    ensureDirectoryExists,
    copyDirectory,
    pathExists,
    joinPath,
} = require("../utils/fileUtils");

/**
 * Root directory containing all portfolio templates.
 *
 * Expected Structure:
 *
 * frontend/
 * └── templates/
 *      ├── modern/
 *      ├── minimal/
 *      └── professional/
 */
const TEMPLATE_ROOT = path.resolve(
    __dirname,
    "../../../frontend/templates"
);

/**
 * Generated projects directory.
 */
const GENERATED_ROOT = path.resolve(
    __dirname,
    "../generated"
);

/**
 * Returns absolute path of a template.
 *
 * @param {string} templateName
 * @returns {string}
 */
function getTemplatePath(templateName) {
    return joinPath(TEMPLATE_ROOT, templateName);
}

/**
 * Returns generated project path.
 *
 * @param {string} projectFolderName
 * @returns {string}
 */
function getGeneratedProjectPath(projectFolderName) {
    return joinPath(GENERATED_ROOT, projectFolderName);
}

/**
 * Validates whether a template exists.
 *
 * @param {string} templateName
 */
async function validateTemplate(templateName) {
    const templatePath = getTemplatePath(templateName);

    const exists = await pathExists(templatePath);

    if (!exists) {
        throw new Error(
            `Template "${templateName}" does not exist.`
        );
    }

    return templatePath;
}

/**
 * Copies the selected template into Generator/generated.
 *
 * @param {string} templateName
 * @param {string} projectFolderName
 *
 * @returns {Promise<Object>}
 */
async function copyTemplate(templateName, projectFolderName) {
    const templatePath = await validateTemplate(templateName);

    await ensureDirectoryExists(GENERATED_ROOT);

    const generatedProjectPath =
        getGeneratedProjectPath(projectFolderName);

    await copyDirectory(
        templatePath,
        generatedProjectPath
    );

    return {
        templateName,
        templatePath,
        generatedProjectPath,
    };
}

module.exports = {
    copyTemplate,
    validateTemplate,
    getTemplatePath,
    getGeneratedProjectPath,
};