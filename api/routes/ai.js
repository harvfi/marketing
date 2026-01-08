import express from 'express';
import { supabase } from '../config/supabase.js';
import { generateMarketingInsight } from '../config/gemini.js';

const router = express.Router();

// Chat with AI assistant
router.post('/chat', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { message, context } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Build context-aware prompt
        let prompt = `You are an AI marketing assistant for ScaleQmarketing. Help the user with their marketing questions and provide actionable insights.\n\n`;

        if (context) {
            prompt += `Context: ${JSON.stringify(context)}\n\n`;
        }

        prompt += `User question: ${message}\n\nProvide a helpful, professional response with specific marketing advice.`;

        const response = await generateMarketingInsight(prompt);

        res.json({ response });
    } catch (error) {
        console.error('AI chat error:', error);
        res.status(500).json({ error: 'Failed to generate AI response' });
    }
});

// Generate marketing content suggestions
router.post('/content-suggestions', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { topic, platform, tone } = req.body;

        if (!topic) {
            return res.status(400).json({ error: 'Topic is required' });
        }

        const prompt = `Generate 5 engaging ${platform || 'social media'} post ideas about "${topic}" with a ${tone || 'professional'} tone. Format as a numbered list with brief descriptions.`;

        const suggestions = await generateMarketingInsight(prompt);

        res.json({ suggestions });
    } catch (error) {
        console.error('Content suggestions error:', error);
        res.status(500).json({ error: 'Failed to generate content suggestions' });
    }
});

// Analyze campaign performance
router.post('/analyze-campaign', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { campaignData } = req.body;

        if (!campaignData) {
            return res.status(400).json({ error: 'Campaign data is required' });
        }

        const prompt = `Analyze this marketing campaign data and provide insights:\n\n${JSON.stringify(campaignData, null, 2)}\n\nProvide:\n1. Key performance indicators\n2. Areas of improvement\n3. Actionable recommendations`;

        const analysis = await generateMarketingInsight(prompt);

        res.json({ analysis });
    } catch (error) {
        console.error('Campaign analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze campaign' });
    }
});

export default router;
