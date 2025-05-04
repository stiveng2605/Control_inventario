import { Router } from "express";
import { ProductController } from "../controllers/productController.js";


export const productRouter = Router()


//Ruta obtener lista
productRouter.get('/', ProductController.getAll)

//Obtener Por ID
productRouter.get('/:id', ProductController.getById)

//Crear Producto
productRouter.post('/', ProductController.create)

//Eliminar Producto
productRouter.delete('/:id', ProductController.delete)

//Actualizar Producto
productRouter.put('/:id', ProductController.update)