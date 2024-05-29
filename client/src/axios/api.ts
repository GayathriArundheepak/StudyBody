import axios from 'axios';

// Create an Axios instance with default settings
const instance = axios.create({
 // baseURL: 'http://localhost:8080', // Set your base URL here
  baseURL: 'http://13.233.66.221:5000', // Set your base URL here
  withCredentials: true, // Include cookies in requests
  headers: {
    'Content-Type': 'application/json', // Set default Content-Type header
  },
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log('Request Interceptor:', config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.error('Request Error Interceptor:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    // console.log('Response Interceptor:', response);
    return response;
  },
  function (error) {
    // Do something with response error
    console.error('Response Error Interceptor:', error);
    return Promise.reject(error);
  }
);

export default instance;
