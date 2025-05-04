import products from '../data/products.json' with {type : 'json'}
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/products.json');


//Funcion con la cual por medio de FS podemos sobreescribir los satos para guardar los cambios ene el archivo
function saveProductsToFile() {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
}


export class ProductModel {

    //Realiza toda la "logica" para retornar los productos
    static async getAll () {
        return products
    }

    //Realiza toda la "logica" recibiendo el id para retornar el producto por el ID encontrado
    static async getById ({id}) {
        const product = products.find(product => product.id == id)
        return product
    }

    //Realiza toda la "logica" recibiendo el objeto con los demas datos y asignado un id nuevo
    static async create ({product}) {
        const lastProduct = products[products.length - 1];
        const newId = lastProduct ? lastProduct.id + 1 : 1

        const newProduct = {
            id: newId,
            ...product
        }

        products.push(newProduct)
        saveProductsToFile();
        return newProduct
    }

    //Realiza toda la "logica" recibiendo el id para eliminarlo
    static async delete ({id}) {
        const productIndex = products.findIndex(product => product.id == id)

        if (productIndex == -1) return false

        products.splice(productIndex, 1)
        saveProductsToFile();
        return true
    }

    //Realiza toda la "logica" recibiendo el ID y el objeto con los datos que quiere actualizar y actualizarlo
    static async update ({id, product}) {
        const productIndex = products.findIndex(product => product.id == id)

        if (productIndex == -1) return false

        products[productIndex] = {
            ...products[productIndex],
            ...product
        }

        saveProductsToFile();
        return products[productIndex]
    }

    
}