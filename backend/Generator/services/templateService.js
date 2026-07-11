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
 * Keeps only the selected template in the generated project and rewrites
 * App.jsx so it imports just that template.
 *
 * @param {string} generatedProjectPath
 * @param {string} templateName
 * @returns {Promise<string>} selected template filename
 */
async function setupSelectedTemplate(
    generatedProjectPath,
    templateName
) {
    const generatedTemplates = path.join(
        generatedProjectPath,
        "src",
        "templates"
    );

    const templateMap = {
        minimal: "MinimalTemplate.jsx",
        modern: "ModernTemplate.jsx",
        professional: "ProfessionalTemplate.jsx",
        techpro: "TechProTemplate.jsx",
    };

    const selectedTemplate = templateMap[
        templateName.toLowerCase()
    ];

    if (!selectedTemplate) {
        throw new Error(`Invalid template: ${templateName}`);
    }

    // Remove every template except the selected one.
    await Promise.all(
        Object.values(templateMap)
            .filter((fileName) => fileName !== selectedTemplate)
            .map((fileName) =>
                fs.remove(path.join(generatedTemplates, fileName))
            )
    );

    const appContent = `import React from "react";
import portfolio from "./data/portfolio";
import { PortfolioContext } from "./context/PortfolioContext";
import SelectedTemplate from "./templates/${componentName}";

function App() {
  return (
    <PortfolioContext.Provider value={portfolio}>
      <SelectedTemplate />
    </PortfolioContext.Provider>
  );
}

export default App;
`;

    await fs.writeFile(
        path.join(generatedProjectPath, "src", "App.jsx"),
        appContent,
        "utf8"
    );

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