import axios from "axios";
import { clearCookie, getCookie } from "utils";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("authToken");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      clearCookie("authToken");
      window.location.href = "/";
    }
    return Promise.reject(error.response);
  }
);
