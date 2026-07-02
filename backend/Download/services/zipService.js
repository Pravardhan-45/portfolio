const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");

/**
 * Creates a ZIP archive from a generated portfolio project.
 *
 * @param {string} projectId
 * @param {string} generatedProjectPath
 * @returns {Promise<Object>}
 */
async function createZip(projectId, generatedProjectPath) {
    return new Promise(async (resolve, reject) => {
        try {
            // Check generated project exists
            const exists = await fs.pathExists(generatedProjectPath);

            if (!exists) {
                return reject(
                    new Error("Generated project not found.")
                );
            }

            // downloads folder
            const downloadsDir = path.join(
                __dirname,
                "../downloads"
            );

            await fs.ensureDir(downloadsDir);

            // ZIP file path
            const zipFileName = `portfolio_${projectId}.zip`;

            const zipFilePath = path.join(
                downloadsDir,
                zipFileName
            );

            const output = fs.createWriteStream(zipFilePath);

            const archive = archiver("zip", {
                zlib: {
                    level: 9,
                },
            });

            output.on("close", () => {
                resolve({
                    zipName: zipFileName,
                    zipPath: zipFilePath,
                    size: archive.pointer(),
                });
            });

            archive.on("error", (err) => {
                reject(err);
            });

            archive.pipe(output);

            // Add complete project folder
            archive.directory(generatedProjectPath, false);

            await archive.finalize();

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createZip,
};