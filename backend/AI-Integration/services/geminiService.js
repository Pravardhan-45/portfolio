require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function getSuggestions(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        // The response might contain markdown like ```json ... ```, so clean it
        let text = response.text;
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        
        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error("Gemini returned invalid JSON:", text);
            throw new Error("AI returned an invalid format. Please try again.");
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}

module.exports = getSuggestions;