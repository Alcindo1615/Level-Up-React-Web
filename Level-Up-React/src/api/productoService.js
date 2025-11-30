// src/api/productoService.js
import axios from "axios";

const PRODUCTOS_API_URL = "http://localhost:8082/api/productos";

const productoService = {
  /**
   * Obtiene todos los productos desde el backend (Spring Boot).
   */
  getAll: async () => {
    const response = await axios.get(PRODUCTOS_API_URL);
    return response.data; // array de productos
  },

  /**
   * Obtiene un producto por ID desde el backend.
   */
  getById: async (id) => {
    const response = await axios.get(`${PRODUCTOS_API_URL}/${id}`);
    return response.data; // un solo producto
  },
};

export default productoService;
