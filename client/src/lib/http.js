// client/src/lib/http.js sirve para configurar una instancia de Axios
// que se puede reutilizar en toda la aplicación para hacer solicitudes HTTP.
import axios from "axios";

// Configuración básica de Axios
// baseURL es la URL base de la API
// aquí se utiliza una variable de entorno para mayor flexibilidad
const baseURL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || ""
// timeout en milisegundos
// es para evitar que las solicitudes queden colgadas indefinidamente
const timeout = Number(import.meta.env.VITE_TIMEOUT_MS || 15000);


// Crear una instancia de Axios con la configuración definida
export const http = axios.create({
  // pasamos la baseURL
  baseURL,
  // pasamos el timeout
  timeout,
  // encabezados comunes para todas las solicitudes
  headers: { "Content-Type": "application/json" },
  // no enviar cookies ni credenciales en solicitudes CORS
  withCredentials: false,
});

// Interceptores de errores legibles
http.interceptors.response.use(
  (r) => r,
  (err) => {
    const info = {
      url: err?.config?.url,
      method: err?.config?.method,
      status: err?.response?.status,
      data: err?.response?.data,
      message: err?.message,
    };
    // Útil para depurar en dev
    if (import.meta.env.DEV) console.error("API error:", info);
    return Promise.reject(info);
  }
);
