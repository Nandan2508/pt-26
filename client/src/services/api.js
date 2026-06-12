import axios from 'axios';

// Create a configured Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true, // Send cookies with requests
});

// Global response error interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.error('API Error:', error.response || error.message);
    
    // You could also add logic to handle 401 Unauthorized globally here
    if (error.response && error.response.status === 401) {
      // Optional: trigger logout or redirect
      console.warn('Unauthorized access - please log in again.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
