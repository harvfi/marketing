import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import './Analytics.css';

function Analytics() {
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
        <div className="analytics-page">
            <div className="container-wide">
                <div className="page-header">
                    <div>
                        <h1>Analytics</h1>
                        <p>Track your marketing performance</p>
                    </div>
                </div>

                <div className="analytics-grid">
                    <div className="analytics-card card">
                        <h3>Total Leads</h3>
                        <div className="analytics-value">{analytics?.totalLeads || 0}</div>
                        <div className="analytics-change positive">+{analytics?.recentLeads || 0} this week</div>
                    </div>

                    <div className="analytics-card card">
                        <h3>Active Campaigns</h3>
                        <div className="analytics-value">{analytics?.activeCampaigns || 0}</div>
                        <div className="analytics-change">of {analytics?.totalCampaigns || 0} total</div>
                    </div>

                    <div className="analytics-card card">
                        <h3>Conversion Rate</h3>
                        <div className="analytics-value">{analytics?.conversionRate || 0}%</div>
                        <div className="analytics-change positive">Above average</div>
                    </div>

                    <div className="analytics-card card">
                        <h3>New This Week</h3>
                        <div className="analytics-value">{analytics?.recentLeads || 0}</div>
                        <div className="analytics-change">leads captured</div>
                    </div>
                </div>

                <div className="analytics-details">
                    <div className="card">
                        <h2>Lead Status Breakdown</h2>
                        <div className="status-breakdown">
                            <div className="status-bar-item">
                                <div className="status-bar-label">
                                    <span>New</span>
                                    <span>{analytics?.leadsByStatus?.new || 0}</span>
                                </div>
                                <div className="status-bar">
                                    <div
                                        className="status-bar-fill status-new"
                                        style={{ width: `${(analytics?.leadsByStatus?.new || 0) / (analytics?.totalLeads || 1) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="status-bar-item">
                                <div className="status-bar-label">
                                    <span>Contacted</span>
                                    <span>{analytics?.leadsByStatus?.contacted || 0}</span>
                                </div>
                                <div className="status-bar">
                                    <div
                                        className="status-bar-fill status-contacted"
                                        style={{ width: `${(analytics?.leadsByStatus?.contacted || 0) / (analytics?.totalLeads || 1) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="status-bar-item">
                                <div className="status-bar-label">
                                    <span>Qualified</span>
                                    <span>{analytics?.leadsByStatus?.qualified || 0}</span>
                                </div>
                                <div className="status-bar">
                                    <div
                                        className="status-bar-fill status-qualified"
                                        style={{ width: `${(analytics?.leadsByStatus?.qualified || 0) / (analytics?.totalLeads || 1) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="status-bar-item">
                                <div className="status-bar-label">
                                    <span>Converted</span>
                                    <span>{analytics?.leadsByStatus?.converted || 0}</span>
                                </div>
                                <div className="status-bar">
                                    <div
                                        className="status-bar-fill status-converted"
                                        style={{ width: `${(analytics?.leadsByStatus?.converted || 0) / (analytics?.totalLeads || 1) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h2>Key Metrics</h2>
                        <div className="metrics-list">
                            <div className="metric-item">
                                <span className="metric-label">Total Leads</span>
                                <span className="metric-value">{analytics?.totalLeads || 0}</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-label">Total Campaigns</span>
                                <span className="metric-value">{analytics?.totalCampaigns || 0}</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-label">Active Campaigns</span>
                                <span className="metric-value">{analytics?.activeCampaigns || 0}</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-label">Conversion Rate</span>
                                <span className="metric-value">{analytics?.conversionRate || 0}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
