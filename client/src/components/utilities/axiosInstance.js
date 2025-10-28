import axios from 'axios';

const DB_URL = import.meta.env.VITE_DB_URL;

export const axiosInstance = axios.create({
    baseURL: DB_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);