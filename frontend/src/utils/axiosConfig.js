import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/authSlice';

// Create axios instance with base URL pointing to API Gateway
const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

// Request interceptor - Add JWT token to all requests
api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;
        const tokenExpiry = state.auth.tokenExpiry;

        // Check if token is expired
        if (tokenExpiry && Date.now() > tokenExpiry) {
            console.warn('⚠️ Token expired, logging out...');
            store.dispatch(logout());
            window.location.href = '/login';
            return Promise.reject(new Error('Token expired'));
        }

        // Add token to Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔑 Added JWT token to request:', config.url);
        }

        return config;
    },
    (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - Handle 401 Unauthorized errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('❌ 401 Unauthorized - Token invalid or expired');
            // TODO: Product Service needs JWT validation configured
            // Temporarily disabled auto-logout to prevent redirect loop
            // store.dispatch(logout());
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
