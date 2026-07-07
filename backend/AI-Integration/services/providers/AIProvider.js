/**
 * STRATEGY PATTERN - AI Provider Interface
 * 
 * Every AI provider must implement this contract:
 *   analyze(prompt: string) => Promise<object>
 * 
 * To add a new provider (e.g. OpenAI, Claude):
 *   1. Create a new file: services/providers/openAIProvider.js
 *   2. Implement the analyze(prompt) method
 *   3. Register it in aiProviderFactory.js
 */

class AIProvider {
    async analyze(prompt) {
        throw new Error("analyze() must be implemented by the AI provider strategy.");
    }
}

module.exports = AIProvider;
