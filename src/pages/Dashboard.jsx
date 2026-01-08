import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import AIAssistant from '../components/AIAssistant';
import './Dashboard.css';

function Dashboard({ user }) {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const data = await apiService.getDashboardAnalytics();
            setAnalytics(data);
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="container-wide">
                <div className="dashboard-header">
                    <div>
                        <h1>Welcome back, {user?.user_metadata?.full_name || 'there'}! 👋</h1>
                        <p>Here's what's happening with your marketing today</p>
                    </div>
                </div>

                <div className="stats-grid">
                    <div className="stat-card card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-info">
                            <div className="stat-value">{analytics?.totalLeads || 0}</div>
                            <div className="stat-label">Total Leads</div>
                        </div>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-info">
                            <div className="stat-value">{analytics?.activeCampaigns || 0}</div>
                            <div className="stat-label">Active Campaigns</div>
                        </div>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon">📈</div>
                        <div className="stat-info">
                            <div className="stat-value">{analytics?.conversionRate || 0}%</div>
                            <div className="stat-label">Conversion Rate</div>
                        </div>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon">⚡</div>
                        <div className="stat-info">
                            <div className="stat-value">{analytics?.recentLeads || 0}</div>
                            <div className="stat-label">New This Week</div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-section card">
                        <h2>Quick Actions</h2>
                        <div className="quick-actions">
                            <a href="/leads" className="action-btn">
                                <span className="action-icon">➕</span>
                                <span>Add New Lead</span>
                            </a>
                            <a href="/campaigns" className="action-btn">
                                <span className="action-icon">🚀</span>
                                <span>Create Campaign</span>
                            </a>
                            <a href="/analytics" className="action-btn">
                                <span className="action-icon">📊</span>
                                <span>View Analytics</span>
                            </a>
                        </div>
                    </div>

                    <div className="dashboard-section card">
                        <h2>Lead Status Overview</h2>
                        <div className="status-list">
                            <div className="status-item">
                                <span className="status-label">New</span>
                                <span className="status-count">{analytics?.leadsByStatus?.new || 0}</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Contacted</span>
                                <span className="status-count">{analytics?.leadsByStatus?.contacted || 0}</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Qualified</span>
                                <span className="status-count">{analytics?.leadsByStatus?.qualified || 0}</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Converted</span>
                                <span className="status-count">{analytics?.leadsByStatus?.converted || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <AIAssistant />
            </div>
        </div>
    );
}

export default Dashboard;
