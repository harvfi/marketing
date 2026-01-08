import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', async (req, res) => {
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

        // Get total leads
        const { count: totalLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

        // Get leads by status
        const { data: leadsByStatus } = await supabase
            .from('leads')
            .select('status')
            .eq('user_id', user.id);

        const statusCounts = leadsByStatus?.reduce((acc, lead) => {
            acc[lead.status] = (acc[lead.status] || 0) + 1;
            return acc;
        }, {});

        // Get total campaigns
        const { count: totalCampaigns } = await supabase
            .from('campaigns')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

        // Get active campaigns
        const { count: activeCampaigns } = await supabase
            .from('campaigns')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('status', 'active');

        // Get recent leads (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { count: recentLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .gte('created_at', sevenDaysAgo.toISOString());

        res.json({
            totalLeads: totalLeads || 0,
            leadsByStatus: statusCounts || {},
            totalCampaigns: totalCampaigns || 0,
            activeCampaigns: activeCampaigns || 0,
            recentLeads: recentLeads || 0,
            conversionRate: totalLeads > 0 ? ((statusCounts?.converted || 0) / totalLeads * 100).toFixed(1) : 0
        });
    } catch (error) {
        console.error('Dashboard analytics error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get lead trends (last 30 days)
router.get('/lead-trends', async (req, res) => {
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

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: leads } = await supabase
            .from('leads')
            .select('created_at')
            .eq('user_id', user.id)
            .gte('created_at', thirtyDaysAgo.toISOString());

        // Group by day
        const trendData = leads?.reduce((acc, lead) => {
            const date = new Date(lead.created_at).toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        res.json({ trends: trendData || {} });
    } catch (error) {
        console.error('Lead trends error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
