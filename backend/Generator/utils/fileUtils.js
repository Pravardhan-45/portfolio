const fs = require("fs-extra");
const path = require("path");

/**
 * Ensures a directory exists.
 */
async function ensureDirectoryExists(dirPath) {
    await fs.ensureDir(dirPath);
}

/**
 * Checks if a file/folder exists.
 */
async function pathExists(targetPath) {
    return fs.pathExists(targetPath);
}

/**
 * Copies a directory.
 */
async function copyDirectory(source, destination) {
    await fs.copy(source, destination, {
        overwrite: true,
        errorOnExist: false,
    });
}

/**
 * Copies a file.
 */
async function copyFile(source, destination) {
    await fs.copy(source, destination, {
        overwrite: true,
    });
}

/**
 * Deletes a directory.
 */
async function deleteDirectory(dirPath) {
    if (await fs.pathExists(dirPath)) {
        await fs.remove(dirPath);
    }
}

/**
 * Deletes a file.
 */
async function deleteFile(filePath) {
    if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
    }
}

/**
 * Reads JSON.
 */
async function readJSON(filePath) {
    return fs.readJson(filePath);
}

/**
 * Writes JSON.
 */
async function writeJSON(filePath, data) {
    await fs.writeJson(filePath, data, {
        spaces: 2,
    });
}

/**
 * Reads text file.
 */
async function readFile(filePath) {
    return fs.readFile(filePath, "utf8");
}

/**
 * Writes text file.
 */
async function writeFile(filePath, content) {
    await fs.writeFile(filePath, content, "utf8");
}

/**
 * Returns directory listing.
 */
async function readDirectory(dirPath) {
    return fs.readdir(dirPath);
}

/**
 * Creates path.
 */
function joinPath(...paths) {
    return path.join(...paths);
}

module.exports = {
    ensureDirectoryExists,
    pathExists,
    copyDirectory,
    copyFile,
    deleteDirectory,
    deleteFile,
    readJSON,
    writeJSON,
    readFile,
    writeFile,
    readDirectory,
    joinPath,
};