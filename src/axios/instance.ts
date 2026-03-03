import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

const instance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// --- REQUEST INTERCEPTOR ---
instance.interceptors.request.use(
  (config) => {
    // Token lato client
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // x-request-id con fallback
    try {
      config.headers["x-request-id"] = crypto.randomUUID();
    } catch {
      config.headers["x-request-id"] = Math.random().toString(36).slice(2);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR ---
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    console.error("API Error:", {
      url: error.config?.url,
      status,
      data: error.response?.data,
    });

    // Esempio: refresh token automatico
    if (status === 401) {
      // qui potresti fare refresh token
    }

    return Promise.reject(error);
  }
);

export default instance;
