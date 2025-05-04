import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const listfalse: Product[] = [
    { id: 1, name: 'Producto A', category: 'Electrónica', price: 100, stock: 10 },
    { id: 2, name: 'Producto B', category: 'Ropa', price: 50, stock: 5 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener todos los productos', () => {
    service.getProductos().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(listfalse);
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush(listfalse);
  });

  it('debe obtener un producto por id', () => {
    const id = 1;
    service.getProductById(id).subscribe(product => {
      expect(product).toEqual([listfalse[0]]);
    });

    const req = httpMock.expectOne(`http://localhost:3000/products/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush([listfalse[0]]);
  });

  it('debe agregar productos', () => {
    service.addProduct(listfalse).subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('debe eliminar un producto', () => {
    const id = 2;
    service.deleteProducto(id).subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`http://localhost:3000/products/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });

  it('debe actualizar un producto', () => {
    const id = 1;
    const updatedProduct: Product = { id: 1, name: 'Producto Actualizado', category: 'Electrónica', price: 150, stock: 7 };

    service.updateProduct(id, updatedProduct).subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`http://localhost:3000/products/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true });
  });
});
