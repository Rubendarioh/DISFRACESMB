const tbody = document.querySelector("tbody");
const btnComprar = document.querySelector("button#btnComprar");

// Recuperar el carrito del localStorage
let carritoFrutas = JSON.parse(localStorage.getItem('carritoFrutas')) || [];

// Función para renderizar la tabla del carrito
const retornarTablaHTML = (producto) => {
    return `
        <tr>
            <td>${producto.imagen}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><button onclick="eliminarProducto(${producto.id})">Quitar</button></td>
        </tr>
    `;
};

// Función para actualizar la visualización del carrito en el checkout
const actualizarCarrito = () => {
    tbody.innerHTML = ""; // Limpiar el contenido actual de la tabla

    carritoFrutas.forEach((producto) => {
        tbody.innerHTML += retornarTablaHTML(producto); // Agregar cada producto a la tabla
    });

    const total = carritoFrutas.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    document.getElementById('total').textContent = `Total: $${total}`;
};

// Función para eliminar un producto del carrito
const eliminarProducto = (frutaId) => {
    carritoFrutas = carritoFrutas.filter(item => item.id !== frutaId);
    localStorage.setItem('carritoFrutas', JSON.stringify(carritoFrutas)); // Actualizar el localStorage
    actualizarCarrito(); // Actualizar la visualización del carrito
};

// Evento para el botón de comprar
btnComprar.addEventListener("click", () => {
    alert("Muchas gracias por su compra");
    localStorage.removeItem("carritoFrutas");  // Eliminar el carrito del localStorage
    carritoFrutas = []; // Vaciar el carrito
    actualizarCarrito(); // Actualizar la visualización del carrito
});

// Llamar a la función para actualizar la visualización del carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});
