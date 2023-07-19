import {ProductManager} from './productManager.js';

let productManager = new ProductManager();

let persistProduct = async ()=>{
    await productManager.addProduct('Product1', 'Description1', 10, 'Image1','abc123',20);
    await productManager.updateProduct(1,'price',1000);
    await productManager.getProducts(); 
    await productManager.getProductById(1);
    
    console.log(await productManager.getProducts());
    console.log(await productManager.getProductById(1));
}

persistProduct();
