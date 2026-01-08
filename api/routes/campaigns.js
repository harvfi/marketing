import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Get all campaigns for a user
router.get('/', async (req, res) => {
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

        const { status } = req.query;
        let query = supabase
            .from('campaigns')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ campaigns: data });
    } catch (error) {
        console.error('Get campaigns error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new campaign
router.post('/', async (req, res) => {
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

        const { name, description, status, start_date, end_date, budget } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Campaign name is required' });
        }

        const { data, error } = await supabase
            .from('campaigns')
            .insert([{
                user_id: user.id,
                name,
                description,
                status: status || 'planning',
                start_date,
                end_date,
                budget
            }])
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({ campaign: data });
    } catch (error) {
        console.error('Create campaign error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a campaign
router.put('/:id', async (req, res) => {
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

        const { id } = req.params;
        const { name, description, status, start_date, end_date, budget } = req.body;

        const { data, error } = await supabase
            .from('campaigns')
            .update({
                name,
                description,
                status,
                start_date,
                end_date,
                budget,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (!data) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        res.json({ campaign: data });
    } catch (error) {
        console.error('Update campaign error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a campaign
router.delete('/:id', async (req, res) => {
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

        const { id } = req.params;

        const { error } = await supabase
            .from('campaigns')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        console.error('Delete campaign error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
