import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom';

const Carrito = () => {

    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);

    const handleVaciar = () => {
        vaciarCarrito();
    }

  return (
    <div className="container carrito-container">
        <h1 className="main-title">Carrito</h1>

        {
            carrito.length > 0 ? (
                <div className="carrito-layout">
                    
                    {/* LISTA DE ITEMS */}
                    <div className="carrito-items">
                        {carrito.map((prod) => (
                            <div key={prod.id} className="carrito-item">
                                <div>
                                    <h3 className="carrito-item-title">{prod.titulo}</h3>
                                    <p className="carrito-item-text">
                                        Precio unitario: <span>${prod.precio}</span>
                                    </p>
                                    <p className="carrito-item-text">
                                        Cantidad: <span>{prod.cantidad}</span>
                                    </p>
                                </div>
                                <div className="carrito-item-total">
                                    <span>Total</span>
                                    <p>${prod.precio * prod.cantidad}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RESUMEN */}
                    <aside className="carrito-resumen">
                        <h2>Resumen</h2>
                        <p className="carrito-resumen-total">
                            Precio total:
                            <span>${precioTotal()}</span>
                        </p>

                        <button
                            className="btn btn-secondary"
                            onClick={handleVaciar}
                        >
                            Vaciar carrito
                        </button>

                        <Link
                            className="btn btn-primary btn-full"
                            to="/checkout"
                        >
                            Finalizar compra
                        </Link>
                    </aside>
                </div>
            ) : (
                <div className="carrito-vacio">
                    <h2>El carrito está vacío DANIEL xd:(</h2>
                    <Link className="btn btn-primary" to="/productos">
                        Ir a comprar
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default Carrito
