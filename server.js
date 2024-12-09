const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 3000;

// Configuración de multer para subida de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/imagproductos/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware para servir archivos estáticos
app.use(express.static('public'));
app.use(express.json());

// Ruta para subir imagen
app.post('/upload', upload.single('imagen'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }
    res.status(200).send('Imagen subida exitosamente');
});

// Ruta para actualizar productos.json
app.put('/js/productos.json', async (req, res) => {
    try {
        await fs.writeFile(
            'public/js/productos.json',
            JSON.stringify(req.body, null, 2)
        );
        res.status(200).send('Archivo actualizado exitosamente');
    } catch (error) {
        console.error('Error al escribir archivo:', error);
        res.status(500).send('Error al actualizar el archivo');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
