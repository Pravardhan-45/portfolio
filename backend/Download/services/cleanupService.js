const fs = require("fs-extra");

/**
 * Deletes a generated project folder.
 *
 * @param {string} generatedProjectPath
 */
async function cleanupGeneratedProject(generatedProjectPath) {
    try {
        if (
            generatedProjectPath &&
            (await fs.pathExists(generatedProjectPath))
        ) {
            await fs.remove(generatedProjectPath);
        }
    } catch (error) {
        console.error(
            "Failed to cleanup generated project:",
            error.message
        );
    }
}

/**
 * Deletes a generated ZIP file.
 *
 * @param {string} zipPath
 */
async function cleanupZip(zipPath) {
    try {
        if (zipPath && (await fs.pathExists(zipPath))) {
            await fs.remove(zipPath);
        }
    } catch (error) {
        console.error(
            "Failed to cleanup ZIP:",
            error.message
        );
    }
}

/**
 * Cleans both generated project and ZIP.
 *
 * @param {Object} options
 * @param {string} options.generatedProjectPath
 * @param {string} options.zipPath
 */
async function cleanup({
    generatedProjectPath,
    zipPath,
}) {
    await cleanupGeneratedProject(generatedProjectPath);
    await cleanupZip(zipPath);
}

module.exports = {
    cleanupGeneratedProject,
    cleanupZip,
    cleanup,
};