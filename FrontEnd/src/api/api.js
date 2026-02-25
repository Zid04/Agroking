import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

// Ajouter le token JWT à chaque requête si présent
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
