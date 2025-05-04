import zod from 'zod'


const productSchema = zod.object({
    name: zod.string({
        required_error: 'El nombre es requerido'
    }).trim().min(1, "El nombre no puede estar vacío"),

    category: zod.string({
        required_error: "La categoría es requerida",
    }).min(1, "La categoría no puede estar vacía"),
    
    price:zod.number({
        required_error: "El precio es requerido",
        invalid_type_error: "El precio debe ser un número",
    }).int().positive("El precio debe ser un número positivo"),

    stock: zod.number({
        required_error: "La cantidad en stock es requerida",
        invalid_type_error: "El stock debe ser un número entero",
    }).int(
        "La cantidad en stock debe ser un número entero"
    ).min(0, "La cantidad en stock no puede ser negativa")
})

export function validProduct(product){
    return productSchema.safeParse(product)
}


export function validPartialProduct(productUp) {
    
    const result = productSchema.partial().safeParse(productUp);

    if (!result.success) {
        return {
            error: result.error.issues.map(issue => issue.message).join(', ')
        };
    }

    // Si la validación es exitosa, devuelve los datos validados
    return { data: result.data };
}

