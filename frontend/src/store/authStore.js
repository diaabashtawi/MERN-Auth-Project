import {create} from "zustand"
import axios from "axios"

const API_URL = 'http://localhost:5000/api/auth'
axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isCheckingAuth: true,
    message: null,

    signup: async (name, email, password) => {
        set({error: null})
        try {
            const response = await axios.post(`${API_URL}/signup`, {name, email, password})
            set({
                user: response.data.user,
                isAuthenticated: true,
            })
        } catch (error) {
            set({
                error: error.response.data.message || 'Error signing up'
            })
            throw error
        }
    },

    login: async (email, password) => {
        set({error: null})
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password})
            set({
                user: response.data.user,
                isAuthenticated: true,
                error: null,
            })
        } catch (error) {
            set({
                error: error.response.data.message || 'Error logging in'
            })
            throw error
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },

    verifyEmail: async (verificationCode) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { verificationCode });
            set({ user: response.data.user, isAuthenticated: true });
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message});
        } catch (error) {
            set({
                error: error.response.data.message || "Error sending reset password email",
            });
            throw error;
        }
    },

    resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
        set({ message: response.data.message, isLoading: false });
    } catch (error) {
        set({
            isLoading: false,
            error: error.response.data.message || "Error resetting password",
        });
        throw error;
    }
},

}))
