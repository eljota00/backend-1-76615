const express = require('express');
const path = require('path');


const productsRouter = require('./src/routes/products.router');
const cartsRouter = require('./src/routes/carts.router');


const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routers montados en /api
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


// Rutas base y manejo de errores simple
app.get('/', (req, res) => res.send('API Entrega N\u00b01 - /api/products & /api/carts'));


app.use((err, req, res, next) => {
console.error(err);
res.status(500).json({ status: 'error', message: 'Hubo un error en el servidor' });
});


app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));