import axios from 'axios';

// In Vite, environment variables are accessed via import.meta.env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = () => {
    const client = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Cache-Control': 'no-cache',
        },
    });

    client.interceptors.request.use(
        async (config) => {
            // Retrieve token from sessionStorage
            const userStr = sessionStorage.getItem('user');
            const token = userStr ? JSON.parse(userStr)?.token : null;
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );

    client.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401 && error.config?.url !== '/') {
                console.error('Unauthorized or token expired. Logging out...');
                sessionStorage.clear();
                // Redirecting to home/login
                window.location.href = '/';
            }
            return Promise.reject(error);
        },
    );

    return client;
};

export const api = apiClient();
export default apiClient;
