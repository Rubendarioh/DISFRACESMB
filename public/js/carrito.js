carritoFrutas = []

// Función para agregar un producto al carrito
const agregarAlCarrito = (frutaId) => {
    if (frutaId > 0) { 
        let productoEncontrado = productos.find((producto) => producto.id === parseInt(frutaId));
        if (productoEncontrado !== undefined) {
            const productoExistente = carritoFrutas.find(item => item.id === productoEncontrado.id);
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                productoEncontrado.cantidad = 1;
                carritoFrutas.push(productoEncontrado);
            }
            almacenarCarrito(); // Invoca la función para almacenar el carrito
            actualizarCarrito(); // Llama a la función para actualizar la visualización del carrito
        }  
    }
};

// Función para almacenar el carrito en localStorage
const almacenarCarrito = () => {
    localStorage.setItem('carritoFrutas', JSON.stringify(carritoFrutas)); // Guarda en local como dato JSON
};

// Función para recuperar el carrito de localStorage
const recuperarCarrito = () => {
    return JSON.parse(localStorage.getItem('carritoFrutas')) || []; // Devuelve un arreglo vacío si no hay nada en el carrito
};

// Función para actualizar la visualización del carrito
const actualizarCarrito = () => {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';  // Limpia el contenido actual del carrito

    let total = 0;

    carritoFrutas.forEach(producto => {
        total += producto.precio * producto.cantidad;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>
                <button onclick="modificarCantidad(${producto.id}, -1)">-</button>
                ${producto.cantidad}
                <button onclick="modificarCantidad(${producto.id}, 1)">+</button>
            </td>
            <td>$${producto.precio * producto.cantidad}</td>
            <td><button onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
        `;
        carritoContainer.appendChild(row);
    });

    document.getElementById('total').textContent = `Total: $${total}`;
};

// Función para modificar la cantidad de un producto en el carrito
const modificarCantidad = (frutaId, cantidad) => {
    const producto = carritoFrutas.find(item => item.id === frutaId);
    if (producto) {
        producto.cantidad += cantidad;
        if (producto.cantidad <= 0) {
            eliminarProducto(frutaId);
        } else {
            almacenarCarrito();
            actualizarCarrito();
        }
    }
};

// Función para eliminar un producto del carrito
const eliminarProducto = (frutaId) => {
    const index = carritoFrutas.findIndex(item => item.id === frutaId);
    if (index !== -1) {
        carritoFrutas.splice(index, 1);
        almacenarCarrito();
        actualizarCarrito();
    }
};

// Llama a actualizarCarrito() al iniciar para mostrar las cantidades actuales
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});
