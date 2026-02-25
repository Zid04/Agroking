import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', 
});

// Ajouter le token JWT à chaque requête si présent
API.interceptors.request.use((config) => {
  // stocké après login
  const token = localStorage.getItem('token'); 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
