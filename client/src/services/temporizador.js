import axios from 'axios';

const temporizador = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
})
export default temporizador;