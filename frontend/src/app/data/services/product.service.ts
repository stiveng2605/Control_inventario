import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  listaProducts: Product[] = []

  private apiurl = "http://localhost:3000/products"

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiurl);
  }

  getProductById(id: number):Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiurl}/${id}`)
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl}/${id}`);
  }

  addProduct(product: Product[]): Observable<any> {
    return this.http.post(this.apiurl, product);
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, product);
  }

}
