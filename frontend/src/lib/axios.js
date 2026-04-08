import axios from 'axios'

const api = axios.create({
  // Use VITE_API_URL if present, otherwise fallback to local dev or production proxy
  baseURL: import.meta.env.VITE_API_URL || 
           (window.location.hostname === 'localhost' ? 'http://localhost:8000' : '/api'),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api
