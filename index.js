const ProductManager = require("./ProductManager.js");

let productManager = new ProductManager();

productManager.init()
  .then(async () => {
    console.log(productManager.getProducts()); // []

    await productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
    console.log(productManager.getProducts()); // [ Product {...} ]

    let product = productManager.getProductById(1);
    console.log(product); // Product {...}

    await productManager.updateProduct(1, { price: 300 });
    console.log(productManager.getProductById(1)); // Product { price: 300, ... }

    await productManager.deleteProduct(1);
    console.log(productManager.getProducts()); // []
  })
  .catch(error => console.error(error));