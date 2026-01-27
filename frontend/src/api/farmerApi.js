import axios from "axios";
import { store } from "../redux/store";

const farmerApi = axios.create({
  baseURL: "http://localhost:8081"
});

// Request interceptor to add JWT token and userId
farmerApi.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    const user = state.auth.user;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Extract userId from user object
    if (user && user.userId) {
      config.headers['X-User-Id'] = user.userId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Separate API instance for farmer orders (uses Buyer Service on port 8082)
export const farmerOrderApi = axios.create({
  baseURL: "http://localhost:8082"
});

// Add same interceptors to farmerOrderApi
farmerOrderApi.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    const user = state.auth.user;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (user && user.userId) {
      config.headers['X-User-Id'] = user.userId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default farmerApi;
