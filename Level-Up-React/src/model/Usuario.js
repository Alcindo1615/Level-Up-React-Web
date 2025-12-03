// src/model/Usuario.js
// Clase de ayuda para manejar usuarios en el frontend
export class Usuario {
  constructor({
    id,
    rut,
    nombre,
    nombreCompleto,
    mail,
    email,
    telefono,
    password,
    idrol,
    creadoEn,
  }) {
    // ID del documento en Firestore (si existe)
    this.id = id || null;

    this.rut = rut;

    // Aceptamos tanto "nombre" como "nombreCompleto"
    this.nombreCompleto = nombreCompleto || nombre || "";

    // Aceptamos "mail" o "email"
    this.email = email || mail || "";

    this.telefono = telefono || "";
    this.password = password || "";
    this.idrol = idrol || null;
    this.creadoEn = creadoEn || null;
  }
}
