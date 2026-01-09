import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import authService from './services/authService';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AccessHub from './pages/AccessHub';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Campaigns from './pages/Campaigns';
import Analytics from './pages/Analytics';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const initAuth = async () => {
            const session = await authService.getSession();
            if (session) {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            }
            setLoading(false);
        };

        initAuth();

        // Listen for auth changes
        const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
            if (session) {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/access-hub" element={<AccessHub />} />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
                />
                <Route
                    path="/signup"
                    element={user ? <Navigate to="/dashboard" /> : <Signup setUser={setUser} />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <>
                            <Header user={user} />
                            <main style={{ minHeight: 'calc(100vh - 140px)' }}>
                                {user ? <Dashboard user={user} /> : <Navigate to="/login" />}
                            </main>
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/leads"
                    element={
                        <>
                            <Header user={user} />
                            <main style={{ minHeight: 'calc(100vh - 140px)' }}>
                                {user ? <Leads /> : <Navigate to="/login" />}
                            </main>
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/campaigns"
                    element={
                        <>
                            <Header user={user} />
                            <main style={{ minHeight: 'calc(100vh - 140px)' }}>
                                {user ? <Campaigns /> : <Navigate to="/login" />}
                            </main>
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/analytics"
                    element={
                        <>
                            <Header user={user} />
                            <main style={{ minHeight: 'calc(100vh - 140px)' }}>
                                {user ? <Analytics /> : <Navigate to="/login" />}
                            </main>
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
