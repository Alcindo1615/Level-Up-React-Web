// src/api/axiosClient.js
import axios from "axios";

// Cliente axios reutilizable para llamar a tu backend de Spring Boot
// Asegúrate de que el backend esté corriendo en este puerto y ruta base.
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api", // backend: http://localhost:8080 + prefijo /api
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
