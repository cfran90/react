import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3003'
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('rasecToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default api;