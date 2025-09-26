import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    return config;
});

export default axiosInstance;