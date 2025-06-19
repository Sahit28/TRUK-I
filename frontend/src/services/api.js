import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // usa la variable del .env
  withCredentials: true
});

export
