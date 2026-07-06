const path = require("path");
const fs = require("fs-extra");
const archiver = require("archiver");

const {
    ensureDirectoryExists,
} = require("../../Generator/utils/fileUtils");

const {
    generateZipName,
} = require("../../Generator/utils/idGenerator");

// backend/Download/downloads
const DOWNLOADS_DIR = path.resolve(
    __dirname,
    "../downloads"
);

/**
 * Creates a ZIP archive from a generated portfolio project.
 *
 * @param {string} generatedProjectPath
 * @returns {Promise<Object>}
 */
async function createZip(generatedProjectPath) {
    // Ensure downloads directory exists
    await ensureDirectoryExists(DOWNLOADS_DIR);

    const zipName = generateZipName();

    const zipPath = path.join(
        DOWNLOADS_DIR,
        zipName
    );

    // Debug logs
    console.log("====================================");
    console.log("Creating ZIP...");
    console.log("Project Path :", generatedProjectPath);

    const exists = await fs.pathExists(generatedProjectPath);
    console.log("Project Exists :", exists);

    if (!exists) {
        throw new Error(
            `Generated project not found:\n${generatedProjectPath}`
        );
    }

    console.log("ZIP Path :", zipPath);
    console.log("====================================");

    return new Promise((resolve, reject) => {

        const output = fs.createWriteStream(zipPath);

        const archive = archiver("zip", {
            zlib: {
                level: 9,
            },
        });

        output.on("close", () => {

            console.log("ZIP Created Successfully");
            console.log("ZIP Size:", archive.pointer(), "bytes");

            resolve({
                zipName,
                zipPath,
                size: archive.pointer(),
            });

        });

        output.on("error", (err) => {
            reject(err);
        });

        archive.on("error", (err) => {
            reject(err);
        });

        archive.pipe(output);

        // Add the entire generated project
        archive.directory(
            generatedProjectPath,
            false
        );

        archive.finalize();
    });
}

module.exports = {
    createZip,
};