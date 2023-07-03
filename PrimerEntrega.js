class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code) {
                console.log(`El codigo ${code} ya existe`);
                return;
            }
        }

        const newProduct = {title, description, price, thumbnail, code, stock};

        if (!Object.values(newProduct).includes(undefined)) {
            this.id++;
            this.products.push({...newProduct, id: this.id});
        } else {
            console.log("todos los campos son requeridos");
        }
    }

    exists(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.log("Not Found");
        } else {
            console.log(product);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
    
        if (!product) {
            console.log('No se encontró el producto con ese id');
            return;
        }
    
        return product;
    }    
}

const productos = new ProductManager();

console.log(productos.getProducts());

productos.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25);
productos.addProduct("producto prueba 1", "Otro producto de prueba", 500, "Sin imagen", "abc124", 25);

console.log(productos.getProducts());

productos.getProductById(3);
