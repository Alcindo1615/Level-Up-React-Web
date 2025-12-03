// src/components/Perfil.jsx
import React, { useEffect, useState } from "react";
import "../styles/Perfil.css";
import {
  actualizarUsuario,
  eliminarUsuario,
  listarUsuarios,
} from "../api/usuarioService";

const Perfil = () => {
  // 👇 Intentamos leer primero "usuario" y, si no, "user"
  const usuarioLocal = JSON.parse(
    localStorage.getItem("usuario") || localStorage.getItem("user")
  );

  // Estado principal del usuario
  const [usuario, setUsuario] = useState(usuarioLocal);
  const [editMode, setEditMode] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // Estado del formulario de edición
  const [form, setForm] = useState({
    nombreCompleto: usuarioLocal?.nombreCompleto || "",
    email: usuarioLocal?.email || "",
    telefono: usuarioLocal?.telefono || "",
  });

  /**
   * 🔄 Sincronizar con el backend al montar el componente
   * - Si el usuario en localStorage NO tiene id,
   *   consultamos al backend (GET /api/usuarios),
   *   buscamos por rut o email y guardamos el usuario completo
   *   con su id de Firestore.
   */
  useEffect(() => {
    const syncUsuarioConBackend = async () => {
      try {
        if (!usuarioLocal) return;

        // Si ya tiene id, no hacemos nada
        if (usuarioLocal.id) return;

        // Pedimos todos los usuarios al backend
        const usuarios = await listarUsuarios();

        // Buscamos el que coincida por rut o email
        const encontrado = usuarios.find(
          (u) =>
            u.rut === usuarioLocal.rut || u.email === usuarioLocal.email
        );

        if (encontrado) {
          // Actualizamos el estado y el localStorage con el usuario correcto (incluye id)
          setUsuario(encontrado);
          localStorage.setItem("usuario", JSON.stringify(encontrado));
          setForm({
            nombreCompleto: encontrado.nombreCompleto || "",
            email: encontrado.email || "",
            telefono: encontrado.telefono || "",
          });
        }
      } catch (err) {
        console.error("Error al sincronizar usuario con backend:", err);
        // No mostramos error al usuario para no asustar, solo lo dejamos en consola.
      }
    };

    if (usuarioLocal) {
      syncUsuarioConBackend();
    }
  }, [usuarioLocal]);

  // Si no hay usuario, mostramos el mensaje vacío
  if (!usuario) {
    return (
      <div className="perfil-page">
        <div className="perfil-card perfil-card-empty">
          <h1 className="perfil-title">Perfil de usuario</h1>
          <p className="perfil-message">
            No hay ninguna sesión activa. Inicia sesión para ver tu perfil.
          </p>
        </div>
      </div>
    );
  }

  // Iniciales para el icono (ej: "OC")
  const iniciales = usuario.nombreCompleto
    ? usuario.nombreCompleto
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  // Maneja cambios en los inputs del formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * ✏️ Actualizar datos en backend y en localStorage
   */
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    // Validación extra: necesitamos el id para poder actualizar
    if (!usuario.id) {
      setError(
        "No se encontró el identificador del usuario. Vuelve a iniciar sesión o regístrate nuevamente."
      );
      return;
    }

    try {
      // Objeto con los datos actualizados
      const actualizado = {
        ...usuario,
        nombreCompleto: form.nombreCompleto,
        email: form.email,
        telefono: form.telefono,
      };

      // Llamada al backend (PUT /api/usuarios/{id})
      await actualizarUsuario(usuario.id, actualizado);

      // Actualizamos el estado y el localStorage
      setUsuario(actualizado);
      localStorage.setItem("usuario", JSON.stringify(actualizado));
      setMensaje("Datos actualizados correctamente ✅");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setError("Error al actualizar tus datos");
    }
  };

  /**
   * 🗑️ Eliminar cuenta en backend y limpiar localStorage
   */
  const handleDelete = async () => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta?"
    );
    if (!confirmar) return;

    setError("");
    setMensaje("");

    // Igual que en actualizar, necesitamos el id
    if (!usuario.id) {
      setError(
        "No se encontró el identificador del usuario. Vuelve a iniciar sesión o regístrate nuevamente."
      );
      return;
    }

    try {
      // Llamada al backend (DELETE /api/usuarios/{id})
      await eliminarUsuario(usuario.id);

      // Limpiamos localStorage y estado
      localStorage.removeItem("usuario");
      localStorage.removeItem("user"); // por si se usaba esta clave
      setUsuario(null);
      setMensaje("Cuenta eliminada correctamente ✅");
    } catch (err) {
      console.error(err);
      setError("Error al eliminar la cuenta");
    }
  };

  return (
    <div className="perfil-page">
      <div className="perfil-header">
        <div className="perfil-header-text">
          <h1 className="perfil-title">Perfil de usuario</h1>
          <p className="perfil-subtitle">
            Revisa tus datos registrados en Level-Up Gamer.
          </p>
        </div>

        {/* Caja de usuario (tarjeta a la derecha) */}
        <div className="perfil-userbox">
          <span className="perfil-userbox-label">Usuario/a</span>
          <div className="perfil-userbox-info">
            <div className="perfil-avatar">
              <span>{iniciales}</span>
            </div>
            <div className="perfil-userbox-data">
              <span className="perfil-username">
                {usuario.nombreCompleto}
              </span>
              <span className="perfil-useremail">{usuario.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mensajes de éxito / error */}
      {mensaje && <p className="perfil-success">{mensaje}</p>}
      {error && <p className="perfil-error">{error}</p>}

      {/* Tarjeta de datos */}
      <div className="perfil-card">
        {/* Rut siempre solo lectura */}
        <div className="perfil-field">
          <span className="perfil-label">Rut</span>
          <span className="perfil-value">{usuario.rut}</span>
        </div>

        {/* Nombre completo */}
        <div className="perfil-field">
          <span className="perfil-label">Nombre completo</span>

          {!editMode ? (
            <span className="perfil-value">{usuario.nombreCompleto}</span>
          ) : (
            <input
              className="perfil-input"
              type="text"
              name="nombreCompleto"
              value={form.nombreCompleto}
              onChange={handleChange}
              required
            />
          )}
        </div>

        {/* Email */}
        <div className="perfil-field">
          <span className="perfil-label">Email</span>

          {!editMode ? (
            <span className="perfil-value">{usuario.email}</span>
          ) : (
            <input
              className="perfil-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          )}
        </div>

        {/* Teléfono */}
        <div className="perfil-field">
          <span className="perfil-label">Teléfono</span>

          {!editMode ? (
            <span className="perfil-value">{usuario.telefono}</span>
          ) : (
            <input
              className="perfil-input"
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          )}
        </div>

        {/* Botones de acción */}
        <div className="perfil-actions">
          {!editMode ? (
            <>
              <button
                className="perfil-btn perfil-btn-primary"
                onClick={() => setEditMode(true)}
              >
                Editar datos
              </button>
              <button
                className="perfil-btn perfil-btn-danger"
                onClick={handleDelete}
              >
                Eliminar cuenta
              </button>
            </>
          ) : (
            <>
              <button
                className="perfil-btn perfil-btn-secondary"
                onClick={() => {
                  setEditMode(false);
                  setForm({
                    nombreCompleto: usuario.nombreCompleto || "",
                    email: usuario.email || "",
                    telefono: usuario.telefono || "",
                  });
                  setError("");
                  setMensaje("");
                }}
              >
                Cancelar
              </button>
              <button
                className="perfil-btn perfil-btn-primary"
                onClick={handleUpdate}
              >
                Guardar cambios
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
