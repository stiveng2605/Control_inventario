import { ProductModel } from '../models/productModel.js';
import { validProduct, validPartialProduct } from '../schemas/product.js';

export class ProductController {

    // Obtener todos los productos
    static async getAll(req, res) {
        const products = await ProductModel.getAll();
        if (products) {
            return res.status(200).json(products);
        }
        return res.status(400).json({ message: 'Error al traer los productos' });
    }

    //Obtener por ID
    static async getById(req, res) {
        const { id } = req.params;
        const result = await ProductModel.getById({id})

        if (!result) {
            return res.status(404).json({ message: 'El producto no existe' });
        }

        return res.status(200).json(result)
    }


  // Crear nuevo producto
    static async create(req, res) {
        const result = validProduct(req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }

        const newProduct = await ProductModel.create({ product: result.data });

        return res.status(201).json({
            message: 'Producto creado correctamente',
            product: newProduct
        });
    }

  // Eliminar producto
    static async delete(req, res) {
        const { id } = req.params;
        const result = await ProductModel.delete({ id });

        if (!result) {
            return res.status(404).json({ message: 'El producto no existe' });
        }

        return res.status(200).json({ message: 'Producto eliminado correctamente' });
    }

  // Actualizar producto
    static async update(req, res) {
        const result = validPartialProduct(req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        const { id } = req.params;
        const updateProduct = await ProductModel.update({ id, product: result.data });

        if (!updateProduct) {
            return res.status(404).json({ error: 'El producto no existe' });
        }

        return res.status(200).json({
            message: 'Producto actualizado correctamente',
            product: updateProduct
        });
    }
}
