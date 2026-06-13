import axios from 'axios';

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
            // Use the TMDB Read Access Token by default
            const tmdbToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
            if (tmdbToken) {
                config.headers.Authorization = `Bearer ${tmdbToken}`;
            }

            // If a specific user token exists in session, it will override the default
            const userStr = sessionStorage.getItem('user');
            const userToken = userStr ? JSON.parse(userStr)?.token : null;

            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }

            return config;
        },
        (error) => Promise.reject(error),
    );

    client.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error),
    );

    return client;
};

export const api = apiClient();
export default apiClient;
