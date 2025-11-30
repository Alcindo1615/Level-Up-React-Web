// src/api/axiosClient.js
import axios from "axios";

// Cliente axios reutilizable para llamar a tu backend de Spring Boot
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api", // 👈 puerto del backend + prefijo /api
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
