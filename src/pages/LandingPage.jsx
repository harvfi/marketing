import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="badge-icon">⚡</span>
                            <span>NEXT-GEN AGENCY OS</span>
                        </div>
                        <h1 className="hero-title">
                            Scale Your Marketing<br />
                            <span className="text-gradient">Enterprise.</span>
                        </h1>
                        <p className="hero-description">
                            The unified operating system for high-performance marketing teams.
                            From AI-driven strategy to real-time video huddles, SCALE³ powers
                            the future of client success.
                        </p>
                        <div className="hero-actions">
                            <Link to="/access-hub" className="btn btn-primary btn-lg">
                                LAUNCH INTRANET →
                            </Link>
                            <button className="btn btn-secondary btn-lg">
                                ▶ WATCH PRODUCT TOUR
                            </button>
                        </div>
                        <div className="social-proof">
                            <div className="social-proof-logo">FORBES</div>
                            <div className="social-proof-logo">TECHCRUNCH</div>
                            <div className="social-proof-logo">WIRED</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mockup Section */}
            <section className="mockup-section">
                <div className="container">
                    <div className="mockup-container">
                        <div className="mockup-window">
                            <div className="window-controls">
                                <span className="control red"></span>
                                <span className="control yellow"></span>
                                <span className="control green"></span>
                            </div>
                            <div className="window-content">
                                <div className="aria-chat">
                                    <div className="aria-avatar">
                                        <div className="rainbow-cube">🎨</div>
                                    </div>
                                    <div className="aria-message">
                                        <p className="aria-name">ARIA ONLINE</p>
                                        <p className="aria-text">Ready to scale today?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-badge">THE ECOSYSTEM</h2>
                        <h3 className="section-title">
                            Everything your agency needs in one<br />
                            unified workspace.
                        </h3>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h4>Strategic AI</h4>
                            <p>AI-powered insights and content generation that understands your brand voice and marketing goals.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🌐</div>
                            <h4>Global Sync</h4>
                            <p>Real-time collaboration across teams and time zones with instant updates and notifications.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h4>Analytics Hub</h4>
                            <p>Comprehensive dashboards that visualize campaign performance and ROI in real-time.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">👥</div>
                            <h4>Lead Command</h4>
                            <p>Intelligent lead management system with automated scoring and nurture workflows.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h4>Campaign Studio</h4>
                            <p>Design, launch, and optimize marketing campaigns with built-in A/B testing tools.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🤝</div>
                            <h4>Partner Hubs</h4>
                            <p>Give your clients a high-end, branded experience with real-time campaign tracking and asset delivery.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Transform Your Marketing?</h2>
                        <p>Join elite agencies and enterprises scaling with SCALE³</p>
                        <Link to="/access-hub" className="btn btn-primary btn-lg">
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3>SCALE³</h3>
                            <p>Operating System for Marketing Excellence</p>
                        </div>
                        <div className="footer-links">
                            <div className="footer-column">
                                <h4>Product</h4>
                                <a href="#features">Features</a>
                                <a href="#pricing">Pricing</a>
                                <Link to="/access-hub">Access Hub</Link>
                            </div>
                            <div className="footer-column">
                                <h4>Company</h4>
                                <a href="#about">About</a>
                                <a href="#contact">Contact</a>
                                <a href="#careers">Careers</a>
                            </div>
                            <div className="footer-column">
                                <h4>Resources</h4>
                                <a href="#docs">Documentation</a>
                                <a href="#support">Support</a>
                                <a href="#blog">Blog</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 SCALE³. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
