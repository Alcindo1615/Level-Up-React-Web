import React, { useState } from "react";
import { useForm } from "react-hook-form";
// ❌ Ya no usamos Firestore directo en el frontend
// import { collection, addDoc } from "firebase/firestore"
// import { db } from '../firebase/config'
import "../styles/Checkout.css"; // reutilizamos los estilos del formulario
import { registrarUsuario } from "../api/usuarioService"; // 👈 nuevo import

const Registro = () => {
  const [usuarioId, setUsuarioId] = useState("");
  const [error, setError] = useState("");

  const { register, handleSubmit, reset } = useForm();

  const registrar = async (data) => {
    setError("");
    setUsuarioId("");

    // Validar contraseñas
    if (data.password !== data.repetirPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Objeto que enviamos al backend (Spring Boot)
    const nuevoUsuario = {
      rut: data.rut,
      nombreCompleto: data.nombreCompleto,
      email: data.email,
      telefono: data.telefono,
      password: data.password, // ⚠️ En producción se debería encriptar / usar Auth
      // creadoEn lo setea el backend, así mantenemos una sola fuente de verdad
    };

    try {
    const idGenerado = await registrarUsuario(nuevoUsuario);

    // 👇 guardamos usuario + id en localStorage para usarlo en Perfil.jsx
    const usuarioGuardado = { id: idGenerado, ...nuevoUsuario };
    localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));

    setUsuarioId(idGenerado);
    reset();
  } catch (e) {
    console.error(e);
    setError("Ocurrió un error al registrar el usuario");
  }

  };

  return (
    <div className="container">
      <h1 className="main-title">Registro de usuario</h1>

      <form className="formulario" onSubmit={handleSubmit(registrar)}>
        <input
          type="text"
          placeholder="Rut"
          {...register("rut", { required: true })}
        />

        <input
          type="text"
          placeholder="Nombre completo"
          {...register("nombreCompleto", { required: true })}
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        <input
          type="tel"
          placeholder="Teléfono"
          {...register("telefono", { required: true })}
        />

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />

        <input
          type="password"
          placeholder="Repetir contraseña"
          {...register("repetirPassword", { required: true })}
        />

        {error && <p className="form-error">{error}</p>}
        {usuarioId && (
          <p className="form-success">
            Usuario registrado correctamente. ID: {usuarioId}
          </p>
        )}

        <button className="enviar" type="submit">
          Registrarme
        </button>
      </form>
    </div>
  );
};

export default Registro;
