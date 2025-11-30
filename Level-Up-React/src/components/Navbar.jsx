// src/components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'
import image from '../assets/icons/icono.png'
import '../styles/Navbar.css'

const Navbar = () => {
  // Leemos el usuario guardado en localStorage (si existe)
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      {/* IZQUIERDA: logo + título */}
      <div className="navbar-left">
        <img src={image} alt="logo" width="120px" />
        <Link to="/" className="logo">
          <h1>LEVEL-UP GAMER</h1>
        </Link>
      </div>

      {/* CENTRO: navegación principal */}
      <div className="navbar-middle">
        <ul className="menu">
          <li><Link className="menu-link" to="/">Inicio</Link></li>
          <li><Link className="menu-link" to="/productos">Productos</Link></li>
          <li><Link className="menu-link" to="/nosotros">Nosotros</Link></li>
          <li><Link className="menu-link" to="/contacto">Contacto</Link></li>

          {/* Perfil solo si hay usuario logueado */}
          {usuario && (
            <li>
              <Link className="menu-link" to="/perfil">Perfil</Link>
            </li>
          )}

          {/* Registrarse solo si NO hay usuario logueado */}
          {!usuario && (
            <li>
              <Link className="menu-link" to="/registro">Registrarse</Link>
            </li>
          )}
        </ul>
      </div>

      {/* DERECHA: login / logout + carrito */}
      <div className="navbar-right">
        {!usuario ? (
          <Link className="menu-link" to="/login">
            Iniciar sesión
          </Link>
        ) : (
          <button
            className="menu-link btn-logout"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        )}

        {/* Widget del carrito */}
        <CartWidget />
      </div>
    </nav>
  )
}

export default Navbar
