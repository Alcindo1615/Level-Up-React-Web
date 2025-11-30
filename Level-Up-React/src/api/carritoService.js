// src/api/carritoService.js
import axios from "axios";

// Cliente Axios para el microservicio de Carrito
// ⚠️ Ajusta el puerto si tu backend CarritoService usa otro
const carritoApi = axios.create({
  baseURL: "http://localhost:8082/api/carrito",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Guarda la lista de productos del carrito en el backend.
 * Espera un array de items con la forma:
 * [{ idProducto, titulo, categoria, cantidad, precio }]
 */
export const guardarCarrito = async (itemsCarrito) => {
  const response = await carritoApi.post("", itemsCarrito);
  // El backend devuelve la lista de IDs generados en Firestore
  return response.data;
};
