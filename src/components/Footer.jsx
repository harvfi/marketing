import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">
                            <span className="logo-icon">⚡</span> ScaleQmarketing
                        </h3>
                        <p className="footer-description">
                            AI-powered marketing platform to scale your business with intelligent insights.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Product</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Features</Link></li>
                            <li><Link to="/">Pricing</Link></li>
                            <li><Link to="/signup">Get Started</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="#blog">Blog</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Legal</h4>
                        <ul className="footer-links">
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} ScaleQmarketing. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
