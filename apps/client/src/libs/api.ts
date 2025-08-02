import axios, { InternalAxiosRequestConfig, AxiosInstance } from "axios";

//creation d'instance axios
const BACKEND_TYPE = process.env.NEXT_PUBLIC_BACKEND_TYPE;

const api: AxiosInstance = axios.create();

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null; //apetraka type foana
    if (token && config.headers) {
      (
        config.headers as Record<string, string>
      ).Authorization = `Bearer ${token}`;
    }

    // raha mampiasa symfony na node ny url dia apetraka ny baseURL mifanaraka
    config.baseURL = config.url?.startsWith("/symfony")
      ? process.env.NEXT_PUBLIC_SYMFONY_URL
      : config.url?.startsWith("/node")
      ? process.env.NEXT_PUBLIC_NODE_URL
      : config.baseURL;
    config.url = config.url?.replace(/^\/(symfony|node)/, "");

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

export default api;
