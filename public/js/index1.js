const productos = [];
const URL = "js/productos.json";

const container = document.querySelector('div.container');

// Recuperar el carrito actual del localStorage o inicializarlo vacío
let carritoFrutas = JSON.parse(localStorage.getItem('carritoFrutas')) || [];

// Función para guardar el carrito en localStorage
const guardarCarrito = () => {
    localStorage.setItem('carritoFrutas', JSON.stringify(carritoFrutas));
};


const retornarCardHtml = (producto) => {
    return `
        <div class="card">
        
            <div class="card-image">${producto.imagen}</div>
            <div class="card-name">${producto.nombre}</div>
            <div class="card-price">$${producto.precio}</div>
            <div class="card-button">
                <button class="button button-outline button-add" id="${producto.id}" title="Clic para agregar al carrito">+</button>
            </div>
        </div>
    `;
};

const activarClickBotones = () => {
    const botonesAgregar = document.querySelectorAll('button.button-outline.button-add');
    if (botonesAgregar.length > 0) {
        botonesAgregar.forEach((button) => {
            button.addEventListener('click', (e) => {
                agregarAlCarrito(e.target.id);
            });
        });
    }
};

const cargarProductos = (array) => {
    if (array.length > 0) {
        array.forEach(producto => {
            container.innerHTML += retornarCardHtml(producto);
        });
        activarClickBotones();
    }
};

const obtenerProductos = () => {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => productos.push(...data))
        .then(() => cargarProductos(productos))
        .catch(error => console.error('Error al cargar los productos:', error));
};
const agregarAlCarrito = (productoId) => {
    const productoSeleccionado = productos.find(producto => producto.id == productoId);

    if (!productoSeleccionado) {
        alert('Error: Producto no encontrado.');
        return;
    }

    const index = carritoFrutas.findIndex(item => item.id == productoId);

    if (index !== -1) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        carritoFrutas[index].cantidad += 1;
    } else {
        // Si el producto no está en el carrito, agrégalo con cantidad inicial 1
        carritoFrutas.push({ ...productoSeleccionado, cantidad: 1 });
    }

    guardarCarrito(); // Actualiza el carrito en localStorage
    // alert(`${productoSeleccionado.nombre} se ha agregado al carrito.`);
};


obtenerProductos();
