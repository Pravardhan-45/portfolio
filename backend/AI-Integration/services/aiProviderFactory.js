/**
 * STRATEGY PATTERN - Factory / Context
 *
 * This factory selects which AI provider strategy to use based on
 * the environment variable AI_PROVIDER.
 *
 * To add a new provider (e.g. OpenAI):
 *   1. Create: services/providers/OpenAIProvider.js
 *   2. Add a case below: case 'openai': return new OpenAIProvider();
 *   3. Set AI_PROVIDER=openai in your .env file
 *
 * Currently supported: 'gemini' (default)
 */

const GeminiProvider = require("./providers/GeminiProvider");

function getAIProvider() {
    const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();

    switch (provider) {
        case "gemini":
            return new GeminiProvider();
        // case "openai":
        //     const OpenAIProvider = require("./providers/OpenAIProvider");
        //     return new OpenAIProvider();
        // case "claude":
        //     const ClaudeProvider = require("./providers/ClaudeProvider");
        //     return new ClaudeProvider();
        default:
            console.warn(`Unknown AI_PROVIDER "${provider}". Falling back to Gemini.`);
            return new GeminiProvider();
    }
}

module.exports = getAIProvider;
