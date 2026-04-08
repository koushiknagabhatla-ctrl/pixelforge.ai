import api from '../lib/axios';

/**
 * Interface for AI Chatbot interactions.
 * Synchronizes with the GPT Archon v4 neural nexus.
 */
export const prompt_deepseek = async (message) => {
    try {
        const { data } = await api.post('/api/chat', { message });
        return data.reply;
    } catch (error) {
        console.error("Neural Synchronization Failed:", error);
        throw error;
    }
};
