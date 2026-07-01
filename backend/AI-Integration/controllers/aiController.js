const createPrompt = require("../prompts/portfolioPrompt");
const getSuggestions = require("../services/geminiService");
const pdfParse = require("pdf-parse");

const analyzePortfolio = async (req, res) => {
    try {
        let { portfolio } = req.body;

        // If sent via FormData, portfolio might be a JSON string
        if (typeof portfolio === 'string') {
            portfolio = JSON.parse(portfolio);
        }

        let jdText = req.body.jd || "";

        // If a file was uploaded, extract text from the PDF
        if (req.file) {
            try {
                const pdfData = await pdfParse(req.file.buffer);
                jdText = pdfData.text;
            } catch (pdfError) {
                console.error("PDF Parsing Error:", pdfError);
                return res.status(400).json({
                    success: false,
                    message: "Failed to parse the uploaded PDF file. Please ensure it is a valid PDF document."
                });
            }
        }

        if (!portfolio || !jdText) {
            return res.status(400).json({
                success: false,
                message: "portfolio and a job description (text or PDF) are required"
            });
        }

        const prompt = createPrompt(portfolio, jdText);

        const response = await getSuggestions(prompt);

        res.json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({
            success: false,
            message: "An internal server error occurred: " + error.message
        });
    }
};

module.exports = {
    analyzePortfolio
};