// src/api/usuarioService.js
import axiosClient from "./axiosClient";

/**
 * Registrar usuario
 * POST /api/usuarios
 * El backend devuelve el ID del documento en Firestore (String).
 */
export const registrarUsuario = async (usuario) => {
  const response = await axiosClient.post("/usuarios", usuario);
  return response.data; // id del documento
};

/**
 * Listar todos los usuarios
 * GET /api/usuarios
 */
export const listarUsuarios = async () => {
  const response = await axiosClient.get("/usuarios");
  return response.data; // array de Usuario
};

/**
 * Obtener un usuario por ID (Firestore)
 * GET /api/usuarios/{id}
 */
export const obtenerUsuarioPorId = async (id) => {
  const response = await axiosClient.get(`/usuarios/${id}`);
  return response.data; // Usuario
};

/**
 * Actualizar usuario
 * PUT /api/usuarios/{id}
 */
export const actualizarUsuario = async (id, usuario) => {
  const response = await axiosClient.put(`/usuarios/${id}`, usuario);
  return response.data; // Usuario actualizado o id, según backend
};

/**
 * Eliminar usuario
 * DELETE /api/usuarios/{id}
 */
export const eliminarUsuario = async (id) => {
  const response = await axiosClient.delete(`/usuarios/${id}`);
  return response.data; // normalmente vacío
};
