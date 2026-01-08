import { supabase } from '../config/supabaseClient.js';
import apiService from './apiService.js';

class AuthService {
    async signup(email, password, fullName) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName
                    }
                }
            });

            if (error) throw error;

            if (data.session) {
                apiService.setToken(data.session.access_token);
            }

            return { user: data.user, session: data.session };
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            if (data.session) {
                apiService.setToken(data.session.access_token);
            }

            return { user: data.user, session: data.session };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async logout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            apiService.setToken(null);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) throw error;

            return user;
        } catch (error) {
            console.error('Get user error:', error);
            return null;
        }
    }

    async getSession() {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error) throw error;

            if (session) {
                apiService.setToken(session.access_token);
            }

            return session;
        } catch (error) {
            console.error('Get session error:', error);
            return null;
        }
    }

    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                apiService.setToken(session.access_token);
            } else {
                apiService.setToken(null);
            }
            callback(event, session);
        });
    }
}

export default new AuthService();
