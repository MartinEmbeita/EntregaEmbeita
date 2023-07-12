const ProductManager = require("./ProductManager.js");
let productManager = new ProductManager();

let persistirProduct = async () => {
    // Agregamos un producto con 'addProduct' en lugar de 'createProduct'
    await productManager.addProduct('Teclado Mecánico', 'Teclado para gaming', 5000, "http://teclado.png", "TECH456", 50);

    let products = await productManager.productList();
    console.log(`Productos encontrados en Product Manager: ${products.length}`);
    console.log(products);

    // Pruebas de los nuevos métodos
    console.log('Obteniendo producto con id 1...');
    let product = await productManager.getProductById(1);
    console.log(product);

    console.log('Actualizando producto con id 1...');
    await productManager.updateProduct(1, 'Teclado Mecánico', 'Teclado para gaming con luces RGB', 5500, "http://teclado.png", "TECH456", 40);
    product = await productManager.getProductById(1);
    console.log(product);

    console.log('Borrando producto con id 1...');
    await productManager.deleteProduct(1);
    products = await productManager.productList();
    console.log(`Productos encontrados en Product Manager: ${products.length}`);
    console.log(products);
};

persistirProduct();
