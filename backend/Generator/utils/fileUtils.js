const fs = require("fs-extra");
const path = require("path");

/**
 * Creates a directory if it doesn't already exist.
 *
 * @param {string} dirPath
 */
async function ensureDirectoryExists(dirPath) {
    await fs.ensureDir(dirPath);
}

/**
 * Checks whether a file or directory exists.
 *
 * @param {string} targetPath
 * @returns {Promise<boolean>}
 */
async function pathExists(targetPath) {
    return await fs.pathExists(targetPath);
}

/**
 * Copies an entire directory.
 *
 * @param {string} source
 * @param {string} destination
 */
async function copyDirectory(source, destination) {
    await fs.copy(source, destination, {
        overwrite: true,
        errorOnExist: false,
    });
}

/**
 * Deletes a directory and all its contents.
 *
 * @param {string} dirPath
 */
async function deleteDirectory(dirPath) {
    if (await fs.pathExists(dirPath)) {
        await fs.remove(dirPath);
    }
}

/**
 * Reads a JSON file.
 *
 * @param {string} filePath
 * @returns {Promise<Object>}
 */
async function readJSON(filePath) {
    return await fs.readJson(filePath);
}

/**
 * Writes data to a JSON file with formatting.
 *
 * @param {string} filePath
 * @param {Object} data
 */
async function writeJSON(filePath, data) {
    await fs.writeJson(filePath, data, {
        spaces: 2,
    });
}

/**
 * Reads a text file.
 *
 * @param {string} filePath
 * @returns {Promise<string>}
 */
async function readFile(filePath) {
    return await fs.readFile(filePath, "utf8");
}

/**
 * Writes text to a file.
 *
 * @param {string} filePath
 * @param {string} content
 */
async function writeFile(filePath, content) {
    await fs.writeFile(filePath, content, "utf8");
}

/**
 * Returns absolute path by joining path segments.
 *
 * @param  {...string} paths
 * @returns {string}
 */
function joinPath(...paths) {
    return path.join(...paths);
}

module.exports = {
    ensureDirectoryExists,
    pathExists,
    copyDirectory,
    deleteDirectory,
    readJSON,
    writeJSON,
    readFile,
    writeFile,
    joinPath,
};