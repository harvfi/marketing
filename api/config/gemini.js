import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error('Missing Gemini API key');
}

const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiModel = () => {
    return genAI.getGenerativeModel({ model: 'gemini-pro' });
};

export const generateMarketingInsight = async (prompt) => {
    try {
        const model = getGeminiModel();
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API error:', error);
        throw error;
    }
};
