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
        let retries = 3;
        let delay = 1000;

        while (retries > 0) {
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
                console.error(`GeminiProvider Error (Attempts remaining: ${retries - 1}):`, error);
                const errStr = error.message || String(error);

                // Handle temporary 503 / UNAVAILABLE capacity spikes by retrying
                if (errStr.includes("503") || errStr.includes("UNAVAILABLE") || error.status === 503) {
                    retries--;
                    if (retries > 0) {
                        await new Promise(resolve => setTimeout(resolve, delay));
                        delay *= 2; // Exponential backoff
                        continue;
                    }
                }

                if (errStr.includes("API_KEY_INVALID") || errStr.includes("key not valid") || errStr.includes("invalid") || errStr.includes("403")) {
                    throw new Error("Invalid Gemini API Key. Please get a valid API Key from Google AI Studio (https://aistudio.google.com/) and paste it as GEMINI_API_KEY in your backend/.env file.");
                }
                throw error;
            }
        }
    }
}

module.exports = GeminiProvider;
