import express from 'express';
import {ProductManager} from './productManager.js';

let productManager = new ProductManager();

const app = express();
const Port = 8080;

app.use(express.urlencoded({extended: true}));;

app.get('/productos', async (req, res) => {
    const productos = await productManager.getProducts();
    const prodObjeto = JSON.parse(productos); 
    res.json (prodObjeto);
}) 

app.get('/productos/query', async (req, res) => {
    const {limit} = req.query;
    if (limit == undefined) {
        const productos = await productManager.getProducts();
        const prodObjeto = JSON.parse(productos); 
        res.json (prodObjeto);
    }else if(limit > 0){
        const productos = await productManager.getProducts();
        const prodObjeto = JSON.parse(productos); 
        const prodFiltrados = prodObjeto.slice(0, limit);
        res.json (prodFiltrados);
    }else {
        res.json ({error: 'Error en la cantidad de productos'});   
    }
})

app.get('/productos/:pid', async (req, res) => {
    const pid = req.params.pid;
    const id = parseInt(pid);
    const producto = await productManager.getProductById(id);
    if (producto) {
        res.json ({producto});
    }else {
        res.json ({error: 'producto no encontrado'});
    }
})

const producto = async () => {
    await productManager.getProductById(1)
}
console.log(producto());

app.listen(Port, () => {console.log(`Server is running on port ${Port}`)})

