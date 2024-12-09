document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    try {
        const nombre = document.getElementById('nombre').value;
        const talle = document.getElementById('talle').value;
        const precio = document.getElementById('precio').value;
        const stock = document.getElementById('stock').value;
        const imagen = document.getElementById('imagen').files[0];

        if (!imagen) {
            alert('Debe seleccionar una imagen.');
            return;
        }

        // Validaciones adicionales
        if (!nombre || !talle || !precio || !stock) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        // Obtener productos existentes
        const response = await fetch('/js/productos.json');
        if (!response.ok) {
            throw new Error('Error al leer productos.json');
        }
        const productos = await response.json();

        // Generar nombre de imagen
        const imagenIndex = productos.length + 1;
        const imagenNombre = `dis0${String(imagenIndex).padStart(2, '0')}.jpg`;

        // Subir imagen
        const formData = new FormData();
        formData.append('imagen', imagen, imagenNombre);

        const uploadResponse = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!uploadResponse.ok) {
            throw new Error('Error al subir la imagen');
        }

        // Crear nuevo producto
        const nuevoProducto = {
            nombre,
            talle,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            imagen: `/images/imagproductos/${imagenNombre}`
        };

        // Actualizar productos.json
        productos.push(nuevoProducto);
        const updateResponse = await fetch('/js/productos.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productos, null, 2)
        });

        if (!updateResponse.ok) {
            throw new Error('Error al actualizar productos.json');
        }

        alert('Producto subido y agregado exitosamente.');
        document.getElementById('productForm').reset();

    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}. Por favor, intente nuevamente.`);
    }
});
