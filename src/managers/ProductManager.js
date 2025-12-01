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


async getAll(){
return await this._readFile();
}


async getById(id){
const items = await this._readFile();
return items.find(i => String(i.id) === String(id)) || null;
}


_generateId(items){
// Generador simple incremental no colisionante
const ids = items.map(i => (typeof i.id === 'number') ? i.id : Number(i.id)).filter(n => !Number.isNaN(n));
const max = ids.length ? Math.max(...ids) : 0;
return max + 1;
}


async add(product){
const items = await this._readFile();
const id = this._generateId(items);
const newProd = { id, ...product };
items.push(newProd);
await this._writeFile(items);
return newProd;
}


async update(id, changes){
const items = await this._readFile();
const idx = items.findIndex(i => String(i.id) === String(id));
if(idx === -1) return null;
// Nunca permitir sobrescribir el id
const updated = { ...items[idx], ...changes, id: items[idx].id };
items[idx] = updated;
await this._writeFile(items);
return updated;
}


async delete(id){
const items = await this._readFile();
const idx = items.findIndex(i => String(i.id) === String(id));
if(idx === -1) return false;
items.splice(idx, 1);
await this._writeFile(items);
return true;
}
}


module.exports = ProductManager;