import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://your-api-url.com', // Set your base URL
  timeout: 5000,  // Set a timeout for the requests (optional)
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization token or any headers before sending the request
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // You can add more headers if needed
    // config.headers['Content-Type'] = 'application/json';

    return config;  // Don't forget to return the config
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    return response;
  },
  (error) => {
    // Any status code that falls outside the range of 2xx triggers this function
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized, you can redirect to the login page, or refresh the token
        console.error('Unauthorized - Redirect to login');
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        console.error('Forbidden - Access Denied');
      } else if (error.response.status === 500) {
        console.error('Internal Server Error');
      } else {
        console.error(error.response.data.message || 'An error occurred');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error', error.message);
    }

    // Optionally return a rejected promise to propagate error handling
    return Promise.reject(error);
  }
);

export default api;
