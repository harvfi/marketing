const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
    constructor() {
        this.baseURL = API_URL;
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    async request(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    // Auth endpoints
    async signup(email, password, fullName) {
        return this.request('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, fullName })
        });
    }

    async login(email, password) {
        return this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    async logout() {
        return this.request('/api/auth/logout', {
            method: 'POST'
        });
    }

    // Leads endpoints
    async getLeads(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`/api/leads?${params}`);
    }

    async createLead(leadData) {
        return this.request('/api/leads', {
            method: 'POST',
            body: JSON.stringify(leadData)
        });
    }

    async updateLead(id, leadData) {
        return this.request(`/api/leads/${id}`, {
            method: 'PUT',
            body: JSON.stringify(leadData)
        });
    }

    async deleteLead(id) {
        return this.request(`/api/leads/${id}`, {
            method: 'DELETE'
        });
    }

    // Campaigns endpoints
    async getCampaigns(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`/api/campaigns?${params}`);
    }

    async createCampaign(campaignData) {
        return this.request('/api/campaigns', {
            method: 'POST',
            body: JSON.stringify(campaignData)
        });
    }

    async updateCampaign(id, campaignData) {
        return this.request(`/api/campaigns/${id}`, {
            method: 'PUT',
            body: JSON.stringify(campaignData)
        });
    }

    async deleteCampaign(id) {
        return this.request(`/api/campaigns/${id}`, {
            method: 'DELETE'
        });
    }

    // AI endpoints
    async chatWithAI(message, context = null) {
        return this.request('/api/ai/chat', {
            method: 'POST',
            body: JSON.stringify({ message, context })
        });
    }

    async getContentSuggestions(topic, platform, tone) {
        return this.request('/api/ai/content-suggestions', {
            method: 'POST',
            body: JSON.stringify({ topic, platform, tone })
        });
    }

    async analyzeCampaign(campaignData) {
        return this.request('/api/ai/analyze-campaign', {
            method: 'POST',
            body: JSON.stringify({ campaignData })
        });
    }

    // Analytics endpoints
    async getDashboardAnalytics() {
        return this.request('/api/analytics/dashboard');
    }

    async getLeadTrends() {
        return this.request('/api/analytics/lead-trends');
    }

    // Email endpoints
    async sendContactEmail(name, email, subject, message) {
        return this.request('/api/email/contact', {
            method: 'POST',
            body: JSON.stringify({ name, email, subject, message })
        });
    }
}

export default new ApiService();
