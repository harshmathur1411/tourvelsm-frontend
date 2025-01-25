import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Adjust base URL as per your backend
});

// Register API call
export const registerUser = (data) => API.post('/register', data);

// Login API call
export const loginUser = (data) => API.post('/login', data);
