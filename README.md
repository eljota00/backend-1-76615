1) Clonar el repositorio
2) Ejecutar `npm install`
3) Crear carpeta /data con products.json y carts.json (pueden estar vacíos: [])
4) Ejecutar `npm run dev` (si tienes nodemon) o `npm start`
5) Probar rutas con Postman o curl:
- GET http://localhost:8080/api/products/
- POST http://localhost:8080/api/products/ (body JSON con title, description, code, price, status, stock, category, thumbnails)
- PUT /api/products/:pid
- DELETE /api/products/:pid


- POST http://localhost:8080/api/carts/ -> crea carrito
- GET http://localhost:8080/api/carts/:cid
- POST http://localhost:8080/api/carts/:cid/product/:pid -> agrega 1 unidad del producto


6) Entregar: subir el repositorio a GitHub (sin node_modules) y compartir el enlace.