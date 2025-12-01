const express = require('express');
try{
const prods = await pm.getAll();
res.json(prods);
}catch(err){ next(err); }
});


// GET /api/products/:pid -> por id
router.get('/:pid', async (req, res, next) => {
try{
const pid = req.params.pid;
const prod = await pm.getById(pid);
if(!prod) return res.status(404).json({ error: 'Producto no encontrado' });
res.json(prod);
}catch(err){ next(err); }
});


// POST /api/products/ -> crear
router.post('/', async (req, res, next) => {
try{
const body = req.body;
// Validaciones mínimas
const required = ['title','description','code','price','status','stock','category','thumbnails'];
const missing = required.filter(f => typeof body[f] === 'undefined');
if(missing.length) return res.status(400).json({ error: 'Faltan campos', missing });


// Asegurarse que thumbnails es array
if(!Array.isArray(body.thumbnails)) body.thumbnails = [];


const prod = await pm.add({
title: body.title,
description: body.description,
code: body.code,
price: Number(body.price),
status: Boolean(body.status),
stock: Number(body.stock),
category: body.category,
thumbnails: body.thumbnails
});


res.status(201).json(prod);
}catch(err){ next(err); }
});


// PUT /api/products/:pid -> actualizar (sin modificar id)
router.put('/:pid', async (req, res, next) => {
try{
const pid = req.params.pid;
const changes = req.body;
if('id' in changes) delete changes.id; // proteger id
const updated = await pm.update(pid, changes);
if(!updated) return res.status(404).json({ error: 'Producto no encontrado' });
res.json(updated);
}catch(err){ next(err); }
});


// DELETE /api/products/:pid
router.delete('/:pid', async (req, res, next) => {
try{
const pid = req.params.pid;
const ok = await pm.delete(pid);
if(!ok) return res.status(404).json({ error: 'Producto no encontrado' });
res.json({ status: 'ok' });
}catch(err){ next(err); }
});


module.exports = router;