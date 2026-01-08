import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import './Leads.css';

function Leads() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'new',
        source: '',
        notes: ''
    });

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        try {
            const data = await apiService.getLeads();
            setLeads(data.leads || []);
        } catch (error) {
            console.error('Failed to load leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiService.createLead(formData);
            setShowModal(false);
            setFormData({ name: '', email: '', phone: '', company: '', status: 'new', source: '', notes: '' });
            loadLeads();
        } catch (error) {
            console.error('Failed to create lead:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                await apiService.deleteLead(id);
                loadLeads();
            } catch (error) {
                console.error('Failed to delete lead:', error);
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
                        <h1>Leads Management</h1>
                        <p>Track and manage your marketing leads</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        ➕ Add New Lead
                    </button>
                </div>

                {leads.length === 0 ? (
                    <div className="empty-state card">
                        <div className="empty-icon">👥</div>
                        <h3>No leads yet</h3>
                        <p>Start by adding your first lead</p>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            Add Lead
                        </button>
                    </div>
                ) : (
                    <div className="leads-table-container card">
                        <table className="leads-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th>Source</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.id}>
                                        <td>{lead.name}</td>
                                        <td>{lead.email}</td>
                                        <td>{lead.company || '-'}</td>
                                        <td>
                                            <span className={`status-badge status-${lead.status}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td>{lead.source || '-'}</td>
                                        <td>
                                            <button
                                                className="btn-icon"
                                                onClick={() => handleDelete(lead.id)}
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
                            <h2>Add New Lead</h2>
                            <form onSubmit={handleSubmit} className="lead-form">
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        className="input"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        className="input"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Company</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        className="input"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="qualified">Qualified</option>
                                        <option value="converted">Converted</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Source</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.source}
                                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                        placeholder="e.g., Website, Referral, Social Media"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Notes</label>
                                    <textarea
                                        className="input"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        rows="3"
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add Lead
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

export default Leads;
