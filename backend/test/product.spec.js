import request from 'supertest';
import app from '../app.js';

// Traer los productos
describe('Traer Los Productos', () => {
    test('products debe devolver un codigo de estado 200', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
    });

    test('products debe devolver un array', async () => {
        const response = await request(app).get('/products');
        expect(response.body).toBeInstanceOf(Array);
    });
});

// Crear nuevo producto válido
describe('Crear nuevo producto Valido', () => {
    const validProduct = {
        name: 'Impresora',
        category: 'Tecnología',
        price: 550000,
        stock: 12,
    };

    test('Productos devuelve un código de estado 201 si el producto es válido', async () => {
        const response = await request(app).post('/products').send(validProduct);
        expect(response.status).toBe(201);
    });

    test('Productos devuelve el nuevo producto con un ID asignado', async () => {
        const response = await request(app).post('/products').send(validProduct);
        expect(response.body.product).toHaveProperty('id');  // Cambié a 'product'
    });

    test('Productos devuelve un mensaje de confirmacion', async () => {
        const response = await request(app).post('/products').send(validProduct)
        expect(response.body.message).toBe('Producto creado correctamente')
    })
});

// Crear nuevo producto inválido
describe('Crear nuevo producto Invalido', () => {
    const invalidProduct = {
        name: '',
        category: '',
        price: -100,
        stock: -5,
    };

    test('Productos rechaza un producto inválido con código 400', async () => {
        const response = await request(app).post('/products').send(invalidProduct);
        expect(response.status).toBe(400);
    });

    test('Productos devuelve un mensaje de error si el producto es inválido', async () => {
        const response = await request(app).post('/products').send(invalidProduct);
        expect(response.body).toHaveProperty('error');
    });
});

// Eliminar productos existentes
describe('ELiminar Productos Existente', () => {
    let productId;

    test('Productos devuelve código 200 al eliminar un producto existente', async () => {
        const create = await request(app).post('/products').send({
            name: 'Producto Temporal',
            category: 'Tecnología',
            price: 99999,
            stock: 1,
        });

        productId = create.body.product.id;
        const response = await request(app).delete(`/products/${productId}`);
        expect(response.status).toBe(200);

    });

    test('Productos devuelve el mensaje de confirmación al momento de eliminar', async () => {
        const create = await request(app).post('/products').send({
            name: 'Producto Temporal',
            category: 'Tecnología',
            price: 99999,
            stock: 1,
        });
        productId = create.body.product.id;

        const response = await request(app).delete(`/products/${productId}`);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Producto eliminado correctamente');
    });
});

// Eliminar productos inexistentes
describe('ELiminar Productos Inexistente', () => {
    test('Productos devuelve codigo de estado 404 si se intenta eliminar un producto inexistente', async () => {
        const response = await request(app).delete('/products/0');
        expect(response.status).toBe(404);
    });

    test('Productos devuelve el mensaje de que el producto no existe', async () => {
        const response = await request(app).delete('/products/0');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('El producto no existe');
    });
});

// Actualizar productos existentes
describe('Actualizar Productos Existente', () => {
    test('Productos devuelve código 200 al actualizar un producto existente', async () => {
        const create = await request(app).post('/products').send({
            name: 'Producto Original',
            category: 'Tecnología',
            price: 100,
            stock: 5,
        });

        const productId = create.body.product.id;

        const response = await request(app).put(`/products/${productId}`).send({
            name: 'Producto Actualizado',
            price: 150,
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Producto actualizado correctamente');
        expect(response.body).toHaveProperty('product');
        expect(response.body.product).toHaveProperty('name', 'Producto Actualizado');
    });

    test('Productos devuelve un código de estado 400 al no poder actualizar', async () => {
        const create = await request(app).post('/products').send({
            name: 'Producto Para Actualizar',
            category: 'Tecnología',
            price: 200,
            stock: 3,
        });

        const productId = create.body.id;

        const response = await request(app).put(`/products/${productId}`).send({
            name: '',
            price: -300,
        });

        expect(response.status).toBe(400);
    });

    test('Productos devuelve un mensaje de error al no poder actualizar', async () => {
        const create = await request(app).post('/products').send({
            name: 'Producto Para Actualizar',
            category: 'Tecnología',
            price: 200,
            stock: 3,
        });

        const productId = create.body.id;

        const response = await request(app).put(`/products/${productId}`).send({
            name: '',
            price: -300,
        });

        expect(response.body).toHaveProperty('error');
    });
});

// Actualizar productos inexistentes
describe('Actualizar Productos Inexistente', () => {
    test('Devuelve 404 si se intenta actualizar un producto que no existe', async () => {
        const response = await request(app).put('/products/999999').send({
            name: 'Intento Fallido',
            price: 1000,
        });

        expect(response.status).toBe(404);
    });

    test('Devuelve mensaje de error si el producto no existe', async () => {
        const response = await request(app).put('/products/999999').send({
            name: 'Intento Fallido',
            price: 1000,
        });

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('El producto no existe');
    });
});
