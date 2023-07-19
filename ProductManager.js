import fsModule from 'fs'; 

class Product{
    constructor (title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
};

export class ProductManager{
    #productList;
    #productDir;
    #productFile;
    #fsModule;

    constructor(){
        this.#productList = [];
        this.#productDir = "./Products";
        this.#productFile = `${this.#productDir}/Products.json`;
        this.#fsModule = fsModule; 
    }

    checkCodeDuplicate (code){
        return this.#productList.some(product => product.code === code);
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        let newProduct = new Product(title, description, price, thumbnail, code, stock);
        try{
            await this.#fsModule.promises.mkdir(this.#productDir, {recursive: true});
            
            if (!this.#fsModule.existsSync(this.#productFile)){
                await this.#fsModule.promises.writeFile(this.#productFile, '[]');
            }
    
            let productsFileContent = await this.#fsModule.promises.readFile(this.#productFile, 'utf-8');
    
            this.#productList = JSON.parse(productsFileContent);
    
            if (this.checkCodeDuplicate(newProduct.code)){
                return {error: 'El producto ya existe'};
            }
            let id = this.#productList.length + 1;
            let productToAdd = {...newProduct, id: id};
            this.#productList.push(productToAdd);
            
            await this.#fsModule.promises.writeFile(this.#productFile, JSON.stringify(this.#productList, null, 2));
    
        }
        catch (error){
            console.error(`Error al crear el nuevo producto: ${JSON.stringify(newProduct)}, error details: ${error}`);
            throw Error(`Error al crear el nuevo producto: ${JSON.stringify(newProduct)}, error details: ${error}`);
        }
    }

    getProducts = async () => {
        try{
            await this.#fsModule.promises.mkdir(this.#productDir, {recursive: true});
            
            if (!this.#fsModule.existsSync(this.#productFile)){
                await this.#fsModule.promises.writeFile(this.#productFile, '[]');
            }
    
            let productsFileContent = await this.#fsModule.promises.readFile(this.#productFile, 'utf-8');

            this.#productList = productsFileContent;    
            return this.#productList;
        }
        catch (error){
            console.error(`Error con el producto: ${error}`);
            throw Error(`Error con el producto: ${error}`);
        }
    }

    getProductById = async (id) => {
        try{
            await this.#fsModule.promises.mkdir(this.#productDir, {recursive: true});
            
            if (!this.#fsModule.existsSync(this.#productFile)){
                await this.#fsModule.promises.writeFile(this.#productFile, '[]');
            }
    
            let productsFileContent = await this.#fsModule.promises.readFile(this.#productFile, 'utf-8');
    
            this.#productList = JSON.parse(productsFileContent);
    
            let product = this.#productList.find(product => product.id === id);
            if (product){
                console.log(`Product found:`);
                console.log(product);
                return product;
            }
            
        }
        catch (error){
            console.error(`Error al crear producto con id: ${id}, error details: ${error}`);
        }
    }

    updateProduct = async (id, key, value) => {
        try{
            await this.#fsModule.promises.mkdir(this.#productDir, {recursive: true});
            
            if (!this.#fsModule.existsSync(this.#productFile)){
                await this.#fsModule.promises.writeFile(this.#productFile, '[]');
            }
    
            let productsFileContent = await this.#fsModule.promises.readFile(this.#productFile, 'utf-8');
    
            this.#productList = JSON.parse(productsFileContent);
    
            let product = this.#productList.find(product => product.id === id);
            
            if (product){
                product[key] = value;
                await this.#fsModule.promises.writeFile(this.#productFile, JSON.stringify(this.#productList, null, 2));
            }    
        } catch (error){
            console.error(`Error al crear producto con id: ${id}, error details: ${error}`);
        }
    }

    deleteProduct = async (id) => {
        try{
            await this.#fsModule.promises.mkdir(this.#productDir, {recursive: true});
            
            if (!this.#fsModule.existsSync(this.#productFile)){
                await this.#fsModule.promises.writeFile(this.#productFile, '[]');
            }
    
            let productsFileContent = await this.#fsModule.promises.readFile(this.#productFile, 'utf-8');
    
            this.#productList = JSON.parse(productsFileContent);
    
            let product = this.#productList.find(product => product.id === id);
            
            if (product){
                this.#productList = this.#productList.filter(product => product.id !== id);
                await this.#fsModule.promises.writeFile(this.#productFile, JSON.stringify(this.#productList, null, 2));
            }
        
        }catch (error){
            console.error(`Error al crear producto con id: ${id}, error details: ${error}`);
        }
    }
}
