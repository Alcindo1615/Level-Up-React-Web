import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import '../styles/Checkout.css';

// 🚀 Servicio para hablar con el backend de Carrito
import { guardarCarrito } from '../api/carritoService';

// 🚀 NUEVO: servicio para hablar con el backend de Pedido
import { crearPedido } from '../api/pedidoService';

const Checkout = () => {

    const [pedidoId, setPedidoId] = useState("");

    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);

    const { register, handleSubmit } = useForm();

    // Función que se ejecuta al hacer click en "Comprar"
    const comprar = async (data) => {
        // 1) Armamos el objeto pedido como antes (cliente + productos + total)
        const pedido = {
            cliente: data,
            productos: carrito,
            total: precioTotal()
        }
        console.log("Pedido construido en frontend:", pedido);

        // 2) Armamos el array que espera el backend de Carrito
        const itemsCarrito = carrito.map((prod) => ({
            // id del producto tal como lo usas en el frontend
            idProducto: prod.id,
            titulo: prod.titulo,
            categoria: prod.categoria,    // si no existe, simplemente irá undefined
            cantidad: prod.cantidad,
            precio: prod.precio
        }));

        // 3) Enviamos el carrito al backend CarritoService (Spring Boot + Firestore)
        try {
            await guardarCarrito(itemsCarrito);
            console.log("Carrito guardado en el backend correctamente");
        } catch (error) {
            console.error("Error guardando carrito en el backend:", error);
            // No cortamos la compra: seguimos con el pedido igual
        }

        // 4) Enviamos el pedido completo al backend PedidoService
        try {
            const respuesta = await crearPedido(pedido);
            console.log("Respuesta backend pedido:", respuesta);

            // Guardamos el id de pedido que devuelve el backend
            if (respuesta && respuesta.idPedido) {
                setPedidoId(respuesta.idPedido);
            } else {
                // Fallback por si el backend no devuelve el id por algún motivo
                setPedidoId("PEDIDO_CREADO");
            }

            // Vaciamos el carrito del contexto / localStorage
            vaciarCarrito();

        } catch (error) {
            console.error("Error creando pedido en el backend:", error);
            alert("Ocurrió un error al procesar tu pedido. Inténtalo nuevamente.");
        }

        // 5) 🔴 CÓDIGO ORIGINAL (FRONTEND → FIRESTORE) AHORA QUEDA COMENTADO
        //    Ya no se usa porque el backend PedidoService se encarga de guardar en Firestore.
        /*
        const pedidosRef = collection(db, "pedidos");

        addDoc(pedidosRef, pedido)
            .then((doc) => {
                setPedidoId(doc.id);
                vaciarCarrito();
            })
        */
    }

    // Si ya tenemos un pedidoId, mostramos la pantalla de agradecimiento
    if (pedidoId) {
        return (
            <div className="container">
                <h1 className="main-title">Muchas gracias por tu compra</h1>
                <p className="pedido-id">Tu número de pedido es: {pedidoId}</p>
            </div>
        )
    }

    // Pantalla normal de formulario de checkout
    return (
        <div className="container">
            <h1 className="main-title">Finalizar compra</h1>
            <form className="formulario" onSubmit={handleSubmit(comprar)}>

                <input
                    type="text"
                    placeholder="Ingresá tu nombre"
                    {...register("nombre")}
                />
                <input
                    type="email"
                    placeholder="Ingresá tu e-mail"
                    {...register("email")}
                />
                <input
                    type="phone"
                    placeholder="Ingresá tu teléfono"
                    {...register("telefono")}
                />
                <input
                    type="direccion"
                    placeholder="Ingresá tu dirección"
                    {...register("direccion")}
                />

                <button className="enviar" type="submit">Comprar</button>

            </form>
        </div>
    )
}

export default Checkout
