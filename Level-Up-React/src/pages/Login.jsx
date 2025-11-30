// src/components/Login.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import "../styles/Checkout.css"; // reutilizamos estilos

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const iniciarSesion = async (data) => {
    setError("");

    try {
      const usuariosRef = collection(db, "usuarios");

      // Buscar usuario por email
      const q = query(usuariosRef, where("email", "==", data.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("El usuario no existe");
        return;
      }

      const user = querySnapshot.docs[0].data();

      // Validar contraseña
      if (user.password !== data.password) {
        setError("Contraseña incorrecta");
        return;
      }

      // Guardar TODOS los datos necesarios para el perfil
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          rut: user.rut,
          nombreCompleto: user.nombreCompleto,
          email: user.email,
          telefono: user.telefono,
        })
      );

      window.location.href = "/"; // redirige al home

    } catch (e) {
      console.error(e);
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="container">
      <h1 className="main-title">Iniciar Sesión</h1>

      <form className="formulario" onSubmit={handleSubmit(iniciarSesion)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />

        {error && <p className="form-error">{error}</p>}

        <button className="enviar" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
