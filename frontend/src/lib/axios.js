import axios from 'axios'

const api = axios.create({
  // Authoritative Production Routing:
  // If deployed, this must point securely to the Render.com backend URL
  // Locally, we fallback to 8000 for backend development.
  baseURL: import.meta.env.VITE_API_URL 
           || ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
               ? 'http://localhost:8000/api' 
               : '/api'),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Global Error Interceptor for production diagnostics
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorDetail = error.response?.data?.detail || error.response?.data?.error || error.message;
    console.error('Pixel Forge API Failure:', errorDetail);
    
    // If we catch a 500 in production, we log the specific bridge failure
    if (error.response?.status === 500) {
        console.warn('Production Matrix Collapse: Request likely failed at the serverless bridge.');
    }
    
    return Promise.reject(error)
  }
)

export default api
