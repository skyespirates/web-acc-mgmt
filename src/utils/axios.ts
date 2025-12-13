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

export default instance;
