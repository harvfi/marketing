import { Link } from 'react-router-dom';
import './AccessHub.css';

function AccessHub() {
    return (
        <div className="access-hub">
            <div className="access-hub-container">
                <div className="access-hub-header">
                    <div className="logo-container">
                        <div className="logo-icon">
                            <span className="logo-s">S</span>
                        </div>
                        <div className="logo-text">
                            <h1 className="logo-title">SCALE³</h1>
                            <p className="logo-subtitle">OPERATING SYSTEM</p>
                        </div>
                    </div>
                    <p className="access-hub-tagline">
                        The premier platform for high-performance marketing teams and elite client partnerships.
                    </p>
                </div>

                <div className="access-hub-content">
                    <div className="access-section">
                        <div className="access-icons">
                            <div className="access-icon">⚡</div>
                            <div className="access-icon">🏢</div>
                        </div>
                        <h2 className="access-title">Access Hub</h2>
                        <p className="access-description">
                            Initialize your session to begin production
                        </p>
                    </div>

                    <div className="access-grid">
                        <Link to="/dashboard" className="access-card directorate">
                            <div className="access-card-icon">👑</div>
                            <h3>Directorate</h3>
                            <p className="access-card-label">FULL COMMAND</p>
                        </Link>

                        <Link to="/login" className="access-card staff">
                            <div className="access-card-icon">👤</div>
                            <h3>Staff Login</h3>
                            <p className="access-card-label">TEAM ACCESS</p>
                        </Link>

                        <Link to="/signup" className="access-card join">
                            <div className="access-card-icon">👥</div>
                            <h3>Join Team</h3>
                            <p className="access-card-label">NEW MEMBER</p>
                        </Link>

                        <div className="access-card partner">
                            <div className="access-card-icon">🤝</div>
                            <h3>Partner Access</h3>
                            <p className="access-card-label">CLIENT PORTAL</p>
                        </div>
                    </div>

                    <div className="access-footer">
                        <p className="access-footer-label">PARTNERSHIPS</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccessHub;
