const createPrompt = require("../prompts/portfolioPrompt");
const getSuggestions = require("../services/geminiService");

const analyzePortfolio = async (req, res) => {
    try {
        const { portfolio, jd } = req.body;

        if (!portfolio || !jd) {
            return res.status(400).json({
                success: false,
                message: "portfolio and jd are required"
            });
        }

        const prompt = createPrompt(portfolio, jd);

        const response = await getSuggestions(prompt);

        res.json({
            success: true,
            data: response
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    analyzePortfolio
};