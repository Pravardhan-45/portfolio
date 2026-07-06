const path = require("path");
const fs = require("fs-extra");

const {
    ensureDirectoryExists,
    copyDirectory,
    pathExists,
} = require("../utils/fileUtils");

// Generator/starter
const STARTER_ROOT = path.resolve(__dirname, "../starter");

// Generator/generated
const GENERATED_ROOT = path.resolve(__dirname, "../generated");

/**
 * Copies the complete starter project.
 *
 * @param {string} projectFolderName
 * @returns {Promise<string>}
 */
async function copyStarter(projectFolderName) {
    if (!(await pathExists(STARTER_ROOT))) {
        throw new Error("Starter project not found.");
    }

    await ensureDirectoryExists(GENERATED_ROOT);

    const destination = path.join(
        GENERATED_ROOT,
        projectFolderName
    );

    await copyDirectory(STARTER_ROOT, destination);

    return destination;
}

/**
 * Copies only the selected template into the generated project.
 *
 * @param {string} generatedProjectPath
 * @param {string} templateName
 */
async function setupSelectedTemplate(
    generatedProjectPath,
    templateName
) {
    const starterTemplates = path.join(
        STARTER_ROOT,
        "src",
        "templates"
    );

    const generatedTemplates = path.join(
        generatedProjectPath,
        "src",
        "templates"
    );

    const templateMap = {
        minimal: "MinimalTemplate.jsx",
        modern: "ModernTemplate.jsx",
        professional: "ProfessionalTemplate.jsx",
    };

    const selectedTemplate = templateMap[
        templateName.toLowerCase()
    ];

    if (!selectedTemplate) {
        throw new Error(`Invalid template: ${templateName}`);
    }

    // Keep all templates in the generated project to prevent App.jsx from breaking
    // due to missing imports. App.jsx will dynamically render the selectedTemplate.
    
    return selectedTemplate;
}

/**
 * Creates a standalone portfolio project.
 *
 * @param {string} templateName
 * @param {string} projectFolderName
 */
async function prepareProject(
    templateName,
    projectFolderName
) {
    const generatedProjectPath =
        await copyStarter(projectFolderName);

    const selectedTemplate =
        await setupSelectedTemplate(
            generatedProjectPath,
            templateName
        );

    return {
        generatedProjectPath,
        selectedTemplate,
    };
}

module.exports = {
    copyStarter,
    setupSelectedTemplate,
    prepareProject,
};