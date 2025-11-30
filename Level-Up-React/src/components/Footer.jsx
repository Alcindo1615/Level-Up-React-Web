import React from "react";
import '../styles/Footer.css';
import logo from '../assets/icons/icono.png'; // cambia si usas otro logo
import mercadoPago from '../assets/icons/mercado-pago.png';
import webpay from '../assets/icons/webpay.png';

const Footer = () => {
  return (
    <footer className="footer">

  <div className="footer-top">

    <div className="footer-section footer-center">
      <img src={logo} className="footer-logo" />
      <p className="footer-subtitle">Síguenos en nuestras redes</p>

      <div className="footer-social">
        <span className="social-circle">IG</span>
        <span className="social-circle">FB</span>
        <span className="social-circle">TT</span>
      </div>
    </div>

    <div className="footer-section">
      <h3>SITIOS DE INTERÉS</h3>
      <a href="#">Contáctanos</a>
      <a href="#">Nuestras garantías</a>
      <a href="#">Términos y condiciones</a>
      <a href="#">Blog</a>
    </div>

    <div className="footer-section">
      <h3>CONTÁCTENOS</h3>
      <p>consultas@levelupgamer.cl</p>
      <p>ventas@levelupgamer.cl</p>
      <p>+56 9 9999 9999</p>
      <p>Av. Vicuña Mackenna #4917, San Joaquín</p>
      <p>Lun a Vie 10:00–18:30</p>
      <p>Sáb 10:00–14:00</p>
      <p>Dom y Festivos cerrado</p>
    </div>

  </div>

  <div className="footer-line"></div>

  <div className="footer-bottom">
    <p>© Level-Up Gamer, 2025. Todos los derechos reservados.</p>

    <div className="footer-pay">
      <img src={mercadoPago} />
      <img src={webpay} />
    </div>
  </div>

</footer>

  );
};

export default Footer;
