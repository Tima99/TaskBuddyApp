import axios from 'axios';

// Create an instance of Axios with custom configuration
const instance = axios.create({
  baseURL: "https://score-roster.onrender.com/api", // Your API base URL
  timeout: 60 * 1000, // Timeout for requests (adjust as needed)
});

// Add a response interceptor
instance.interceptors.response.use(null,
  (error) => {
    // console.log(error.response.data)
    if(error.response.headers["content-type"] === "text/html" && error.response.status >= 500)
      error.response.data = { message: "Internal Server Error. Try After Sometime."}
      
    // Handle network errors or other request-related errors
    return Promise.reject(error.response?.data || error);
  }
);

export default instance;
