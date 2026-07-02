const crypto = require("crypto");

/**
 * Generates a unique project ID.
 *
 * Example:
 *  "a4f9d2c81b7e"
 *  "e91b6a7f34cd"
 *
 * @param {number} length - Length of the ID (default: 12)
 * @returns {string}
 */
function generateProjectId(length = 12) {
    // Generate random bytes and convert to hexadecimal
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
}

/**
 * Generates a unique ZIP filename.
 *
 * Example:
 * portfolio_a4f9d2c81b7e.zip
 *
 * @returns {string}
 */
function generateZipName() {
    return `portfolio_${generateProjectId()}.zip`;
}

/**
 * Generates a generated project folder name.
 *
 * Example:
 * project_a4f9d2c81b7e
 *
 * @returns {string}
 */
function generateProjectFolderName() {
    return `project_${generateProjectId()}`;
}

module.exports = {
    generateProjectId,
    generateZipName,
    generateProjectFolderName,
};