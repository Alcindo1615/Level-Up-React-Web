// src/components/Contacto.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "../styles/Contacto.css";

import ContactoModel from "../model/Contacto";
import { registrarContacto } from "../api/contactoService";

const Contacto = () => {
  const [solicitudId, setSolicitudId] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const enviarSolicitud = async (data) => {
    setError("");

    const nuevoContacto = new ContactoModel({
      nombreCompleto: data.nombreCompleto,
      email: data.email,
      telefono: data.telefono,
      tipoSolicitud: data.tipoSolicitud,
      categoriaProducto: data.categoriaProducto,
      mensaje: data.mensaje,
    });

    try {
      const idGenerado = await registrarContacto(nuevoContacto);
      setSolicitudId(idGenerado);
      reset();
    } catch (e) {
      console.error(e);
      setError("Ocurrió un error al enviar tu solicitud. Inténtalo nuevamente.");
    }
  };

  return (
    <>
      <h1 className="contacto-title">Centro de Soporte Level-Up Gamer</h1>
      <p className="contacto-subtitle">
        ¿Tienes dudas sobre un producto, problemas con tu compra o quieres
        enviarnos una sugerencia? Completa el formulario y nuestro equipo te
        responderá a la brevedad.
      </p>

      <div className="contacto-container">
        {solicitudId && (
          <p className="form-success">
            Tu solicitud fue enviada exitosamente. Número de seguimiento:{" "}
            <strong>{solicitudId}</strong>
          </p>
        )}

        {error && <p className="form-error">{error}</p>}

        <form className="contacto-form" onSubmit={handleSubmit(enviarSolicitud)}>
          <div className="form-group">
            <label htmlFor="nombreCompleto">Nombre completo</label>
            <input
              type="text"
              id="nombreCompleto"
              placeholder="Ej: Daniel Riquelme"
              {...register("nombreCompleto", { required: true })}
            />
            {errors.nombreCompleto && (
              <span className="field-error">Este campo es obligatorio</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ej: daniel@example.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="field-error">Este campo es obligatorio</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              id="telefono"
              placeholder="Ej: 12.222.222-8"
              {...register("telefono", { required: true })}
            />
            {errors.telefono && (
              <span className="field-error">Este campo es obligatorio</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="tipoSolicitud">Tipo de solicitud</label>
            <select
              id="tipoSolicitud"
              {...register("tipoSolicitud", { required: true })}
            >
              <option value="">Seleccione una opción</option>
              <option value="Consulta">Consulta</option>
              <option value="Reclamo">Reclamo</option>
              <option value="Sugerencia">Sugerencia</option>
              <option value="Soporte">Soporte técnico</option>
            </select>
            {errors.tipoSolicitud && (
              <span className="field-error">Este campo es obligatorio</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="categoriaProducto">Categoría del producto</label>
            <select
              id="categoriaProducto"
              {...register("categoriaProducto", { required: true })}
            >
              <option value="">Seleccione una categoría</option>
              <option value="Consolas">Consolas</option>
              <option value="Juegos">Juegos</option>
              <option value="Accesorios">Accesorios</option>
              <option value="PC Gamer">PC Gamer</option>
            </select>
            {errors.categoriaProducto && (
              <span className="field-error">Este campo es obligatorio</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              rows="4"
              placeholder="Cuéntanos en detalle tu consulta, reclamo o sugerencia…"
              {...register("mensaje", { required: true })}
            />
            {errors.mensaje && (
              <span className="field-error">Este campo es obligatorio</span>
            )}
          </div>

          {/* 🔹 Aquí uso la clase que sí tiene estilos en tu CSS: contacto-btn */}
          <button type="submit" className="contacto-btn">
            Enviar solicitud
          </button>
        </form>
      </div>
    </>
  );
};

export default Contacto;
