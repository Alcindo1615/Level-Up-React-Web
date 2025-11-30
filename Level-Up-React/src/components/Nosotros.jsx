// src/components/Nosotros.jsx
import React from "react";
import "../styles/Nosotros.css";

const Nosotros = () => {
  return (
    <main className="nosotros">
      <section className="nosotros-hero">
        <h1 className="nosotros-titulo">Nosotros</h1>
        <p className="nosotros-subtitulo">
          Level-Up Gamer es una tienda online pensada para quienes viven los
          videojuegos con pasión y quieren llevar su experiencia al siguiente nivel.
        </p>
      </section>

      <section className="nosotros-contenido">
        <div className="nosotros-bloque nosotros-bloque--principal">
          <h2>¿Quiénes somos?</h2>
          <p>
            Somos <strong>Level-Up Gamer</strong>, una tienda especializada en productos gamer
            y tecnología orientada al entretenimiento digital. Nuestra misión es
            ofrecer una experiencia de compra sencilla, segura y cercana, para que
            puedas concentrarte en lo que realmente importa: jugar, competir y
            disfrutar.
          </p>
          <p>
            Trabajamos con un catálogo en constante actualización: periféricos, accesorios,
            coleccionables y más, siempre buscando un equilibrio entre
            <strong> calidad, precio y soporte post venta</strong>. Además, ponemos especial
            atención en la experiencia del usuario dentro de la plataforma, por eso
            desarrollamos este sitio utilizando tecnologías modernas como{" "}
            <strong>React</strong>, <strong>Node.js</strong> y un backend en{" "}
            <strong>Spring Boot</strong> con base de datos en la nube.
          </p>
          <p>
            Nos ubicamos en <strong>Santiago de Chile</strong>, pero gracias a nuestra
            plataforma de comercio electrónico podemos llegar a jugadores de todo el país,
            con métodos de pago confiables y opciones de despacho flexibles.
          </p>
        </div>

        <div className="nosotros-bloque nosotros-bloque--lado">
          <h2>Nuestra propuesta</h2>
          <ul className="nosotros-lista">
            <li>Atención cercana y soporte a través de nuestros canales de contacto.</li>
            <li>Catálogo pensado para gamers casuales y competitivos.</li>
            <li>Plataforma desarrollada con enfoque en usabilidad y rendimiento.</li>
            <li>Pagos seguros mediante WebPay, Mercado Pago y otros medios.</li>
            <li>Actualización constante de productos y ofertas especiales.</li>
          </ul>
        </div>
      </section>

      <section className="nosotros-grid">
        <article className="nosotros-card">
          <h3>Nuestra misión</h3>
          <p>
            Entregar a cada jugador una experiencia de compra confiable, rápida y
            transparente, combinando tecnología moderna con un servicio humano y
            accesible. Queremos que cada visita a Level-Up Gamer se sienta como
            entrar a tu tienda gamer favorita.
          </p>
        </article>

        <article className="nosotros-card">
          <h3>Nuestra visión</h3>
          <p>
            Convertirnos en una referencia en el comercio electrónico gamer en Chile,
            integrando nuevas funcionalidades, más métodos de pago y herramientas que
            faciliten la decisión de compra, como reseñas, recomendaciones y seguimiento
            de pedidos en línea.
          </p>
        </article>

        <article className="nosotros-card">
          <h3>Nuestros valores</h3>
          <p>
            Nos basamos en la <strong>confianza</strong>, la{" "}
            <strong>responsabilidad</strong> y el <strong>respeto</strong> por nuestra
            comunidad. Creemos en construir relaciones a largo plazo con las personas
            que visitan la plataforma, ofreciendo información clara, tiempos de respuesta
            razonables y un soporte honesto cuando algo no sale como se esperaba.
          </p>
        </article>
      </section>

      <section className="nosotros-detalle">
        <h2>Un proyecto pensado también como experiencia de aprendizaje</h2>
        <p>
          Este sitio forma parte del proyecto académico <strong>Level-Up Gamer</strong>,
          desarrollado en la asignatura de <strong>Desarrollo FullStack</strong>. La
          plataforma integra un frontend en React con componentes reutilizables (catálogo,
          carrito, detalle de productos, login, registro, etc.) y un backend en
          microservicios que expone APIs REST para gestionar usuarios, ventas, productos,
          órdenes y pagos.
        </p>
        <p>
          De esta forma, Level-Up Gamer no solo funciona como una tienda online, sino
          también como un ejercicio real de arquitectura de software, buenas prácticas
          de desarrollo y consumo de servicios en la nube.
        </p>
      </section>
    </main>
  );
};

export default Nosotros;
