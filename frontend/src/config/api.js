import axios from 'axios';

// Get the API URL from environment variable
// In production: uses the full Render URL
// In development: uses empty string to rely on Vite proxy
const API_URL = import.meta.env.VITE_API_URL || '';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
