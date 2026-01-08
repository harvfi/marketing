import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import '../pages/Leads.css';

function Campaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'planning',
        start_date: '',
        end_date: '',
        budget: ''
    });

    useEffect(() => {
        loadCampaigns();
    }, []);

    const loadCampaigns = async () => {
        try {
            const data = await apiService.getCampaigns();
            setCampaigns(data.campaigns || []);
        } catch (error) {
            console.error('Failed to load campaigns:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiService.createCampaign(formData);
            setShowModal(false);
            setFormData({ name: '', description: '', status: 'planning', start_date: '', end_date: '', budget: '' });
            loadCampaigns();
        } catch (error) {
            console.error('Failed to create campaign:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            try {
                await apiService.deleteCampaign(id);
                loadCampaigns();
            } catch (error) {
                console.error('Failed to delete campaign:', error);
            }
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
        <div className="leads-page">
            <div className="container-wide">
                <div className="page-header">
                    <div>
                        <h1>Campaigns</h1>
                        <p>Manage your marketing campaigns</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        🚀 Create Campaign
                    </button>
                </div>

                {campaigns.length === 0 ? (
                    <div className="empty-state card">
                        <div className="empty-icon">🚀</div>
                        <h3>No campaigns yet</h3>
                        <p>Start by creating your first campaign</p>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            Create Campaign
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-3">
                        {campaigns.map((campaign) => (
                            <div key={campaign.id} className="card campaign-card">
                                <div className="campaign-header">
                                    <h3>{campaign.name}</h3>
                                    <button
                                        className="btn-icon"
                                        onClick={() => handleDelete(campaign.id)}
                                        title="Delete"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <p className="campaign-description">{campaign.description || 'No description'}</p>
                                <div className="campaign-meta">
                                    <div className="meta-item">
                                        <span className="meta-label">Status:</span>
                                        <span className={`status-badge status-${campaign.status}`}>
                                            {campaign.status}
                                        </span>
                                    </div>
                                    {campaign.budget && (
                                        <div className="meta-item">
                                            <span className="meta-label">Budget:</span>
                                            <span className="meta-value">${campaign.budget}</span>
                                        </div>
                                    )}
                                    {campaign.start_date && (
                                        <div className="meta-item">
                                            <span className="meta-label">Start:</span>
                                            <span className="meta-value">{new Date(campaign.start_date).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
                            <h2>Create Campaign</h2>
                            <form onSubmit={handleSubmit} className="lead-form">
                                <div className="form-group">
                                    <label>Campaign Name *</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        className="input"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="3"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        className="input"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="planning">Planning</option>
                                        <option value="active">Active</option>
                                        <option value="paused">Paused</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Start Date</label>
                                    <input
                                        type="date"
                                        className="input"
                                        value={formData.start_date}
                                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>End Date</label>
                                    <input
                                        type="date"
                                        className="input"
                                        value={formData.end_date}
                                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Budget</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Create Campaign
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Campaigns;
