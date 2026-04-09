import api from '../lib/axios';

/**
 * Interface for AI Chatbot interactions.
 * Synchronizes with the GPT Archon v4 neural nexus.
 */
export const prompt_deepseek = async (message, model = 'gemini-2.0-flash') => {
    try {
        const { data } = await api.post('/chat/', { message, model });
        return data.reply;
    } catch (error) {
        console.error("Neural Synchronization Failed:", error);
        throw error;
    }
};
