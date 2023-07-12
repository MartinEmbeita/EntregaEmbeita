const fs = require("fs").promises;
const path = require("path");

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

    constructor() {
        this.#products = [];
        this.#productDirPath = "./files";
        this.#productFilePath = path.join(this.#productDirPath, "/Products.json");
    }

    init = async () => {
        try {
            await fs.mkdir(this.#productDirPath, { recursive: true });
            if (!fs.existsSync(this.#productFilePath)) {
                await fs.writeFile(this.#productFilePath, "[]");
            }
            const productsFile = await fs.readFile(this.#productFilePath, "utf-8");
            this.#products = JSON.parse(productsFile);
        } catch (error) {
            console.error(`Error initializing ProductManager: ${error}`);
            throw Error(`Error initializing ProductManager: ${error}`);
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const newProduct = new Product(title, description, price, thumbnail, code, stock, this.#products.length + 1);
        this.#products.push(newProduct);
        await this.saveProducts();
    }

    getProducts = () => {
        return this.#products;
    }

    getProductById = (id) => {
        const product = this.#products.find(product => product.id === id);
        if (!product) {
            throw new Error(`Product with id ${id} not found.`);
        }
        return product;
    }

    updateProduct = async (id, updatedProductData) => {
        const productIndex = this.#products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error(`Product with id ${id} not found.`);
        }
        this.#products[productIndex] = { ...this.#products[productIndex], ...updatedProductData, id };
        await this.saveProducts();
    }

    deleteProduct = async (id) => {
        const productIndex = this.#products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error(`Product with id ${id} not found.`);
        }
        this.#products.splice(productIndex, 1);
        await this.saveProducts();
    }

    saveProducts = async () => {
        try {
            await fs.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2));
        } catch (error) {
            console.error(`Error saving products: ${error}`);
            throw Error(`Error saving products: ${error}`);
        }
    }
}

module.exports = ProductManager;
