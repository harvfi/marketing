import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Header.css';

function Header({ user }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <span className="logo-icon">⚡</span>
                        <span className="logo-text">ScaleQ<span className="text-gradient">marketing</span></span>
                    </Link>

                    <nav className="nav">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                <Link to="/leads" className="nav-link">Leads</Link>
                                <Link to="/campaigns" className="nav-link">Campaigns</Link>
                                <Link to="/analytics" className="nav-link">Analytics</Link>
                                <button onClick={handleLogout} className="btn btn-ghost">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-ghost">Login</Link>
                                <Link to="/signup" className="btn btn-primary">Get Started</Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
