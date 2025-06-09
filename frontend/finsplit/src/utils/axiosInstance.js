import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// request interceptor
axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle certain error globally
        if(error.response) {
            if (error.response.status === 401) {
                // redirect to login page
                window.location.href = '/login';
            } else if (error.response.status === 500) {
                // handle server error
                console.error('Server error:', error.response.data);
            }
        }
        else if(error.code === 'ECONNABORTED') {
            // handle timeout error
            console.error('Request timed out');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;