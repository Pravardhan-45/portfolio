/**
 * STRATEGY PATTERN - Concrete Strategy: Gemini AI
 * 
 * This is the concrete implementation of AIProvider using Google Gemini.
 * To swap to a different AI, just implement AIProvider in a new file.
 */

require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const AIProvider = require("./AIProvider");

class GeminiProvider extends AIProvider {
    constructor() {
        super();
        this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        this.model = "gemini-2.5-flash";
    }

    async analyze(prompt) {
        try {
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: prompt
            });

            // Clean markdown code blocks if Gemini wraps JSON in ```json ... ```
            let text = response.text;
            text = text.replace(/```json/g, "").replace(/```/g, "").trim();

            try {
                return JSON.parse(text);
            } catch (parseError) {
                console.error("GeminiProvider: Returned invalid JSON:", text);
                throw new Error("AI returned an invalid format. Please try again.");
            }
        } catch (error) {
            console.error("GeminiProvider Error:", error);
            throw error;
        }
    }
}

module.exports = GeminiProvider;
