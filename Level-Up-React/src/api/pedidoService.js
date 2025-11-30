// src/api/pedidoService.js
import axios from "axios";

// Cliente Axios para el microservicio de Pedido
// ⚠️ Cambia el puerto si tu PedidoService usa otro
const pedidoApi = axios.create({
  baseURL: "http://localhost:8084/api/pedidos",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Envia el pedido completo al backend de Pedido.
 * El pedido tiene la forma:
 * {
 *   cliente: { nombre, email, telefono, direccion },
 *   productos: [...],
 *   total: number
 * }
 */
export const crearPedido = async (pedido) => {
  const response = await pedidoApi.post("", pedido);
  // El backend devuelve { idPedido, mensaje }
  return response.data;
};
