import axios from 'axios';

console.log('Environment variable VITE_APP_URL:', import.meta.env.VITE_APP_URL);

const temporizador = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
})

export default temporizador;