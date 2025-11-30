// src/model/Contacto.js

class Contacto {
  constructor({
    id = null,
    nombreCompleto,
    email,
    telefono,
    tipoSolicitud,
    categoriaProducto,
    mensaje,
    creadoEn = null,
  }) {
    this.id = id;
    this.nombreCompleto = nombreCompleto;
    this.email = email;
    this.telefono = telefono;
    this.tipoSolicitud = tipoSolicitud;
    this.categoriaProducto = categoriaProducto;
    this.mensaje = mensaje;
    this.creadoEn = creadoEn;
  }
}

export default Contacto;
