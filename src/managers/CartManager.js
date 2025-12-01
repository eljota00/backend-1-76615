const fs = require('fs').promises;
async _readFile(){
try{
const data = await fs.readFile(this.path, 'utf8');
return JSON.parse(data || '[]');
}catch(e){
if(e.code === 'ENOENT'){
await fs.writeFile(this.path, '[]');
return [];
}
throw e;
}
}


async _writeFile(data){
await fs.writeFile(this.path, JSON.stringify(data, null, 2));
}


_generateId(items){
const ids = items.map(i => (typeof i.id === 'number') ? i.id : Number(i.id)).filter(n => !Number.isNaN(n));
const max = ids.length ? Math.max(...ids) : 0;
return max + 1;
}


async createCart(){
const items = await this._readFile();
const id = this._generateId(items);
const cart = { id, products: [] };
items.push(cart);
await this._writeFile(items);
return cart;
}


async getById(id){
const items = await this._readFile();
return items.find(c => String(c.id) === String(id)) || null;
}


async addProductToCart(cid, pid, quantity = 1){
const items = await this._readFile();
const idx = items.findIndex(c => String(c.id) === String(cid));
if(idx === -1) return null;


const cart = items[idx];
const prodInCart = cart.products.find(p => String(p.product) === String(pid));
if(prodInCart){
prodInCart.quantity = (prodInCart.quantity || 0) + quantity;
}else{
cart.products.push({ product: pid, quantity });
}


items[idx] = cart;
await this._writeFile(items);
return cart;
}
}


module.exports = CartManager;