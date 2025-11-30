// src/components/ItemDetailContainer.jsx
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase/config";
import productoService from "../api/productoService";

const ItemDetailContainer = () => {

  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {

    const fetchItem = async () => {
      try {
        const data = await productoService.getById(id);
        setItem(data);
      } catch (error) {
        console.error("Error al obtener producto por id desde el backend:", error);
      }
    };

    fetchItem();

  }, [id]);

  return (
    <div>
      {item && <ItemDetail item={item} />}
    </div>
  );
};

export default ItemDetailContainer;
