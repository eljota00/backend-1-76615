const express = require('express');
const CartManager = require('../managers/CartManager');
const ProductManager = require('../managers/ProductManager');


const router = express.Router();
const cm = new CartManager();
const pm = new ProductManager();


// POST /api/carts/ -> crear carrito vacío
router.post('/', async (req, res, next) => {
try{
const cart = await cm.createCart();
res.status(201).json(cart);
}catch(err){ next(err); }
});


// GET /api/carts/:cid -> listar productos del carrito
router.get('/:cid', async (req, res, next) => {
try{
const cid = req.params.cid;
const cart = await cm.getById(cid);
if(!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
res.json(cart.products);
}catch(err){ next(err); }
});


// POST /api/carts/:cid/product/:pid -> agregar producto al carrito (1 en 1)
router.post('/:cid/product/:pid', async (req, res, next) => {
try{
const { cid, pid } = req.params;


// Verificar que el producto exista en products
const product = await pm.getById(pid);
if(!product) return res.status(404).json({ error: 'Producto no existe' });


// Agregar al carrito (incrementa quantity si ya existe)
const cart = await cm.addProductToCart(cid, pid, 1);
if(!cart) return res.status(404).json({ error: 'Carrito no encontrado' });


res.json(cart);
}catch(err){ next(err); }
});


module.exports = router;