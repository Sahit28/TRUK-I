import axios from 'axios';
import { logout } from './auth';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Agrega el token automáticamente a cada request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepta respuestas para manejar errores
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      logout(); // Cierra sesión si el token es inválido
    }
    return Promise.reject(err);
  }
);

export default instance;
