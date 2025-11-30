// src/api/usuarioService.js
import axiosClient from "./axiosClient";

// Crear usuario: POST /api/usuarios
export const registrarUsuario = async (usuario) => {
  const response = await axiosClient.post("/usuarios", usuario);
  // El backend devuelve solo el ID del documento en Firestore
  return response.data;
};

// Actualizar usuario: PUT /api/usuarios/{id}
export const actualizarUsuario = async (id, usuario) => {
  const response = await axiosClient.put(`/usuarios/${id}`, usuario);
  return response.data; // normalmente devuelve el mismo id
};

// Eliminar usuario: DELETE /api/usuarios/{id}
export const eliminarUsuario = async (id) => {
  const response = await axiosClient.delete(`/usuarios/${id}`);
  return response.data;
};

