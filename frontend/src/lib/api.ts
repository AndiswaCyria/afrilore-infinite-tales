
import axios from "axios";

const api = axios.create({
  baseURL: "https://afrilore-infinite-tales.onrender.com/api",
  timeout: 30000, // 30 second timeout for cold starts
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    
    // Handle timeout errors specifically
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timed out. The server might be starting up, please try again.';
    }
    
    // Handle network errors
    if (error.message === 'Network Error') {
      error.message = 'Network error. Please check your internet connection.';
    }
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;
