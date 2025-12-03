// src/components/Carousel.jsx
import React from 'react';

// Estilos propios del carrusel (morado Level-Up Gamer)
import '../styles/Carousel.css';

// Componente de carrusel de react-bootstrap
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Imágenes del carrusel (ajusta las rutas a tus imágenes reales)
import banner1 from '../assets/icons/banner1.jpg';
import banner2 from '../assets/icons/banner2.jpg';
import banner3 from '../assets/icons/banner3.jpg';
import banner4 from '../assets/icons/banner4.png';

/**
 * Carrusel principal de Level-Up Gamer
 * - Ocupa el ancho completo bajo el navbar
 * - Usa tu paleta morado gamer
 */
export default function MyCarousel() {
  return (
    <div className="lug-carousel-wrapper">
      <Carousel
        className="lug-carousel"
        interval={2000}          // tiempo entre slides (ms)
        pause="hover"            // se pausa al pasar el mouse
        controls                 // flechas izquierda/derecha
        indicators               // puntitos abajo
        fade                     // transición suave
      >
        <Carousel.Item>
          <img
            className="d-block w-100 lug-carousel-img"
            src={banner1}
            alt="Promoción gamer 1"
          />
          {/* <Carousel.Caption className="lug-carousel-caption">
            <h3>Arma tu setup gamer</h3>
            <p>Monitores, teclados y todo lo que necesitas para subir de nivel.</p>
          </Carousel.Caption> */}
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 lug-carousel-img"
            src={banner2}
            alt="Promoción gamer 2"
          />
          {/* <Carousel.Caption className="lug-carousel-caption">
            <h3>Ofertas en periféricos</h3>
            <p>Discounts en mouse, teclados y audífonos seleccionados.</p>
          </Carousel.Caption> */}
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 lug-carousel-img"
            src={banner3}
            alt="Promoción gamer 3"
          />
          {/* <Carousel.Caption className="lug-carousel-caption">
            <h3>Consolas next-gen</h3>
            <p>Encuentra tu consola favorita con envío rápido.</p>
          </Carousel.Caption> */}
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 lug-carousel-img"
            src={banner4}
            alt="Promoción gamer 4"
          />
          {/* <Carousel.Caption className="lug-carousel-caption">
            <h3>Merch oficial Level-Up Gamer</h3>
            <p>Poleras, tazones y más para completar tu estilo gamer.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
