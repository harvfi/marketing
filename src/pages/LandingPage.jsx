import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content animate-fade-in">
                        <h1 className="hero-title">
                            Scale Your Marketing with <span className="text-gradient">AI Power</span>
                        </h1>
                        <p className="hero-description">
                            Transform your marketing strategy with intelligent lead management,
                            campaign tracking, and AI-powered insights that drive real results.
                        </p>
                        <div className="hero-actions">
                            <Link to="/signup" className="btn btn-primary btn-lg">
                                Get Started Free
                            </Link>
                            <a href="#features" className="btn btn-secondary btn-lg">
                                Learn More
                            </a>
                        </div>
                        <div className="hero-stats">
                            <div className="stat">
                                <div className="stat-value">10K+</div>
                                <div className="stat-label">Active Users</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">500K+</div>
                                <div className="stat-label">Leads Managed</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">95%</div>
                                <div className="stat-label">Satisfaction Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <h2 className="section-title text-center">Powerful Features</h2>
                    <p className="section-description text-center">
                        Everything you need to scale your marketing efforts
                    </p>

                    <div className="features-grid">
                        <div className="feature-card card-glass animate-fade-in">
                            <div className="feature-icon">🤖</div>
                            <h3>AI Assistant</h3>
                            <p>Get instant marketing insights and content suggestions powered by advanced AI</p>
                        </div>

                        <div className="feature-card card-glass animate-fade-in">
                            <div className="feature-icon">👥</div>
                            <h3>Lead Management</h3>
                            <p>Capture, track, and organize leads with intelligent filtering and search</p>
                        </div>

                        <div className="feature-card card-glass animate-fade-in">
                            <div className="feature-icon">📊</div>
                            <h3>Campaign Tracking</h3>
                            <p>Monitor and optimize your marketing campaigns in real-time</p>
                        </div>

                        <div className="feature-card card-glass animate-fade-in">
                            <div className="feature-icon">📈</div>
                            <h3>Analytics Dashboard</h3>
                            <p>Visualize your marketing performance with comprehensive analytics</p>
                        </div>

                        <div className="feature-card card-glass animate-fade-in">
                            <div className="feature-icon">⚡</div>
                            <h3>Real-time Insights</h3>
                            <p>Make data-driven decisions with live performance metrics</p>
                        </div>

                        <div className="feature-card card-glass animate-fade-in">
                            <div className="feature-icon">🎯</div>
                            <h3>Smart Automation</h3>
                            <p>Automate repetitive tasks and focus on what matters most</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="pricing">
                <div className="container">
                    <h2 className="section-title text-center">Simple Pricing</h2>
                    <p className="section-description text-center">
                        Choose the plan that's right for your business
                    </p>

                    <div className="pricing-grid">
                        <div className="pricing-card card">
                            <h3>Starter</h3>
                            <div className="price">
                                <span className="price-amount">$29</span>
                                <span className="price-period">/month</span>
                            </div>
                            <ul className="pricing-features">
                                <li>✓ Up to 500 leads</li>
                                <li>✓ 5 active campaigns</li>
                                <li>✓ Basic analytics</li>
                                <li>✓ AI assistant</li>
                                <li>✓ Email support</li>
                            </ul>
                            <Link to="/signup" className="btn btn-secondary btn-block">
                                Get Started
                            </Link>
                        </div>

                        <div className="pricing-card card pricing-card-featured">
                            <div className="featured-badge">Most Popular</div>
                            <h3>Professional</h3>
                            <div className="price">
                                <span className="price-amount">$79</span>
                                <span className="price-period">/month</span>
                            </div>
                            <ul className="pricing-features">
                                <li>✓ Unlimited leads</li>
                                <li>✓ Unlimited campaigns</li>
                                <li>✓ Advanced analytics</li>
                                <li>✓ Priority AI assistant</li>
                                <li>✓ Priority support</li>
                                <li>✓ Custom integrations</li>
                            </ul>
                            <Link to="/signup" className="btn btn-primary btn-block">
                                Get Started
                            </Link>
                        </div>

                        <div className="pricing-card card">
                            <h3>Enterprise</h3>
                            <div className="price">
                                <span className="price-amount">Custom</span>
                            </div>
                            <ul className="pricing-features">
                                <li>✓ Everything in Professional</li>
                                <li>✓ Dedicated account manager</li>
                                <li>✓ Custom AI training</li>
                                <li>✓ White-label options</li>
                                <li>✓ 24/7 phone support</li>
                                <li>✓ SLA guarantee</li>
                            </ul>
                            <a href="#contact" className="btn btn-secondary btn-block">
                                Contact Sales
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Scale Your Marketing?</h2>
                        <p>Join thousands of businesses growing with ScaleQmarketing</p>
                        <Link to="/signup" className="btn btn-primary btn-lg">
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
