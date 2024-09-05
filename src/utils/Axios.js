import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling refresh token logic
instance.interceptors.response.use(
  (response) => response, // Return the response if successful
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Send request to refresh access token
        const refreshResponse = await axios.post(
          `${BASE_URL}/refresh`, 
          {}, 
          { withCredentials: true } // Send cookies for refresh
        );

        if (refreshResponse.status === 200) {
          // Update the access token in localStorage
          const newAccessToken = refreshResponse.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          // Update the Authorization header with the new token
          instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // Retry the original request with the new token
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh access token', refreshError);
        // Remove the access token and redirect to login if refresh fails
        localStorage.removeItem('accessToken');
        window.location.href = '/login'; // Redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
