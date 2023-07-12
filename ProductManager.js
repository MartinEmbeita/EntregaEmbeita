const fs = require('fs');
const path = require('path');

class Product {
    constructor(title, description, price, thumbnail, code, stock, id) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = id;
    }
};

class ProductManager {
    #products;
    #productDirPath;
    #productFilePath;
    #fileSystem;

    constructor() {
        this.#products = new Array();
        this.#productDirPath = "./files";
        this.#productFilePath = this.#productDirPath + "/Products.json";
        this.#fileSystem = fs;
    }

    // Métodos con persistencia en archivo.json

    // Crear producto
    createProduct = async (title, description, price, thumbnail, code, stock, id) => {
        let newProduct = new Product(title, description, price, thumbnail, code, stock, id);

        //Verificamos si el directorio existe, de lo contrario, lo creamos.
        if (!fs.existsSync(this.#productDirPath)) {
            fs.mkdirSync(this.#productDirPath);
        }
        
        //Validamos que exista ya el archivo con usuarios sino se crea vacío para ingresar nuevos:
        if (!fs.existsSync(this.#productFilePath)) {
            //Se crea el archivo vacio.
            await fs.promises.writeFile(this.#productFilePath, "[]");
        }

        //leemos el archivo
        let productsFile = await fs.promises.readFile(this.#productFilePath, "utf-8"); // []

        //Cargamos los productos encontrados para agregar el nuevo:
        this.#products = JSON.parse(productsFile);
        
        this.#products.push(newProduct);
        
        //Se sobreescribe el archivo de productos para persistencia.
        await fs.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2, '\t'));
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        let id = this.#products.length + 1;
        await this.createProduct(title, description, price, thumbnail, code, stock, id);
    }

    // Leer productos 
    productList = async () => {
        //Verificamos si el directorio existe, de lo contrario, lo creamos.
        if (!fs.existsSync(this.#productDirPath)) {
            fs.mkdirSync(this.#productDirPath);
        }

        //Validamos que exista ya el archivo con usuarios sino se crea vacío para ingresar nuevos:
        if (!fs.existsSync(this.#productFilePath)) {
            //Se crea el archivo vacio.
            await fs.promises.writeFile(this.#productFilePath, "[]");
        }

        //leemos el archivo
        let productsFile = await fs.promises.readFile(this.#productFilePath, "utf-8");

        //Cargamos los productos encontrados para agregar el nuevo:
        this.#products = JSON.parse(productsFile);
        
        return this.#products;
    }

    // Encuentra un producto por su id
    getProductById = async (id) => {
        let products = await this.productList();
        let product = products.find(p => p.id === id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    // Actualiza un producto por su id
    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
        let products = await this.productList();
        let product = products.find(p => p.id === id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        product.title = title;
        product.description = description;
        product.price = price;
        product.thumbnail = thumbnail;
        product.code = code;
        product.stock = stock;
        // Sobreescribe el archivo de productos después de la actualización
        await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(products, null, 2, '\t'));
    }

    // Borra un producto por su id
    deleteProduct = async (id) => {
        let products = await this.productList();
        let productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        products.splice(productIndex, 1);
        // Sobreescribe el archivo de productos después de la eliminación
        await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(products, null, 2, '\t'));
    }
}

module.exports = ProductManager;
