// src/components/ItemListContainer.jsx
import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../firebase/config";
import productoService from "../api/productoService";

// 👉 Importamos el carrusel (archivo que ya creaste)
import MyCarousel from "./Carousel";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("Productos");

  // Si la URL tiene /productos/:categoria capturamos ese parámetro
  const { categoria } = useParams();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // 1) Traemos TODOS los productos desde el backend
        const data = await productoService.getAll();

        // 2) Si hay categoría en la URL, filtramos en el frontend
        const filtrados = categoria
          ? data.filter((prod) => prod.categoria === categoria)
          : data;

        setProductos(filtrados);
        setTitulo("Productos Destacados");
      } catch (error) {
        console.error(
          "Error al obtener productos desde el backend:",
          error
        );
      }
    };

    fetchProductos();
  }, [categoria]);

  return (
    <div>
      {/* 🟣 Carrusel solo cuando NO hay categoría
          - Es decir, en Inicio ("/") y en "/productos"
          - Si entras a "/productos/Teclados", ya no se muestra */}
      {!categoria && <MyCarousel />}

      {/* Lista de productos como la tenías */}
      <ItemList productos={productos} titulo={titulo} />
    </div>
  );
};

export default ItemListContainer;
