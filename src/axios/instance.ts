import axios from 'axios';


const instance = axios.create({
  baseURL: process.env.NEXT_URL_AXIOS!,
  timeout: 35000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    config.headers["x-request-id"] = crypto.randomUUID();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Normalizzazione opzionale
    return response;
  },
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Qui puoi gestire refresh token o redirect
      // esempio:
      // await refreshToken();
      // retry della request originale
    }

    // Logging errori
    console.error("API Error:", {
      url: error.config?.url,
      status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default instance;