import axios from "axios";
import type { CreateAxiosDefaults } from "axios";

const config: CreateAxiosDefaults = {
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
};

const instance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
