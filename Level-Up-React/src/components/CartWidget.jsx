import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';   // <- nuevo import

const CartWidget = () => {

    const { cantidadEnCarrito } = useContext(CartContext);

    // guardamos la cantidad en una constante para reutilizarla
    const cantidad = cantidadEnCarrito();

  return (
    <div>
        <Link className="menu-link cart-widget" to="/carrito">
            {/* Ícono de carrito que se adapta al estilo gamer */}
            <FaShoppingCart className="cart-icon" />

            {/* Texto original "Carrito" se mantiene */}
            <span className="cart-text">Carrito</span>

            {/* Solo se muestra el numerito si hay productos */}
            {cantidad > 0 && (
                <span className="numerito">{cantidad}</span>
            )}
        </Link>
    </div>
  )
}

export default CartWidget
