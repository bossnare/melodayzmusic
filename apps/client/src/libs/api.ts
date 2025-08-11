import axios, { InternalAxiosRequestConfig, AxiosInstance } from 'axios';

//creation d'instance axios
const BACKEND_TYPE = process.env.NEXT_PUBLIC_BACKEND_TYPE;

const api: AxiosInstance = axios.create();

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null; //apetraka type foana
    if (token && config.headers) {
      (
        config.headers as Record<string, string>
      ).Authorization = `Bearer ${token}`;
    }

    // raha mampiasa symfony na node ny url dia apetraka ny baseURL mifanaraka
    config.baseURL =
      process.env.NEXT_PUBLIC_MOCK_API || 'http://localhost:3000/api';

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

export default api;
