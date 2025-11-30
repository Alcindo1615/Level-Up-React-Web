// src/context/CartContext.jsx
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({ children }) => {

  const [carrito, setCarrito] = useState(carritoInicial);

  // 👉 Guarda el item agregado en la colección "carrito" de Firestore
  const guardarItemEnFirestore = async (itemAgregado) => {
    try {
      const carritoRef = collection(db, "carrito");
      await addDoc(carritoRef, {
        idProducto: itemAgregado.id,
        titulo: itemAgregado.titulo,          // o nombre, según tu modelo
        precio: itemAgregado.precio,
        cantidad: itemAgregado.cantidad,
        categoria: itemAgregado.categoria || null,
        fechaCreacion: new Date(),
        estado: "en_carrito",                 // por si luego quieres filtrar
      });
    } catch (error) {
      console.error("Error guardando ítem de carrito en Firestore:", error);
    }
  };

  const agregarAlCarrito = (item, cantidad) => {
    const itemAgregado = { ...item, cantidad };

    const nuevoCarrito = [...carrito];
    const estaEnElCarrito = nuevoCarrito.find(
      (producto) => producto.id === itemAgregado.id
    );

    if (estaEnElCarrito) {
      estaEnElCarrito.cantidad += cantidad;
    } else {
      nuevoCarrito.push(itemAgregado);
    }

    setCarrito(nuevoCarrito);

    // 👇 registra el ítem en Firestore (solo datos de producto, no cliente)
    guardarItemEnFirestore(itemAgregado);
  };

  const cantidadEnCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  };

  const precioTotal = () => {
    return carrito.reduce(
      (acc, prod) => acc + prod.precio * prod.cantidad,
      0
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        cantidadEnCarrito,
        precioTotal,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
