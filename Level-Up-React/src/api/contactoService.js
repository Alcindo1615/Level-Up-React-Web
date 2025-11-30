// src/api/contactoService.js
import axios from "axios";

// Cliente Axios para el microservicio de Contacto
const contactoApi = axios.create({
  baseURL: "http://localhost:8081/api/contacto", // 👈 tu ruta base
  headers: {
    "Content-Type": "application/json",
  },
});

// Crear solicitud de contacto
export const registrarContacto = async (contacto) => {
  // POST http://localhost:8081/api/contacto
  const response = await contactoApi.post("", contacto);
  return response.data; // Devuelve ID generado por el backend
};

// Obtener contacto por ID
export const obtenerContactoPorId = async (id) => {
  // GET http://localhost:8081/api/contacto/{id}
  const response = await contactoApi.get(`/${id}`);
  return response.data;
};
