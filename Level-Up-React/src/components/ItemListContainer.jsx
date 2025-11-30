// src/components/ItemListContainer.jsx
import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../firebase/config";
import productoService from "../api/productoService";

const ItemListContainer = () => {

  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("Productos");

  const categoria = useParams().categoria;

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
        setTitulo("Productos");
      } catch (error) {
        console.error("Error al obtener productos desde el backend:", error);
      }
    };

    fetchProductos();

  }, [categoria]);

  return (
    <div>
      <ItemList productos={productos} titulo={titulo} />
    </div>
  );
};

export default ItemListContainer;
