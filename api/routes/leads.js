import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Get all leads for a user
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

        const { status, search } = req.query;
        let query = supabase
            .from('leads')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (status) {
            query = query.eq('status', status);
        }

        if (search) {
            query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`);
        }

        const { data, error } = await query;

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ leads: data });
    } catch (error) {
        console.error('Get leads error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new lead
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

        const { name, email, phone, company, status, source, notes } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const { data, error } = await supabase
            .from('leads')
            .insert([{
                user_id: user.id,
                name,
                email,
                phone,
                company,
                status: status || 'new',
                source,
                notes
            }])
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({ lead: data });
    } catch (error) {
        console.error('Create lead error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a lead
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
        const { name, email, phone, company, status, source, notes } = req.body;

        const { data, error } = await supabase
            .from('leads')
            .update({
                name,
                email,
                phone,
                company,
                status,
                source,
                notes,
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
            return res.status(404).json({ error: 'Lead not found' });
        }

        res.json({ lead: data });
    } catch (error) {
        console.error('Update lead error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a lead
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
            .from('leads')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Lead deleted successfully' });
    } catch (error) {
        console.error('Delete lead error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
