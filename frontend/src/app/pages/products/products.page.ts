import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/data/interfaces/product.model';
import { ProductService } from 'src/app/data/services/product.service';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone:false
})
export class ProductsPage implements OnInit {

  verProduct : Product[] = []

  constructor(private productService: ProductService, private alertController: AlertController, private router : Router) { }

  verProducts: Boolean = true;

  ngOnInit() {
    this.productService.getProductos().subscribe(
      respuesta => {
        this.verProduct=respuesta
      },
      error => {
        console.log(error)
      }
    )
  }

  async eliminarProducto(id: number) {
    const swalResult = await Swal.fire({
      title: 'Confirmar eliminación',
      text: '¿Estás seguro de que deseas eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
    });
  
    if (swalResult.isConfirmed) {
      this.productService.deleteProducto(id).subscribe({
        next: (res) => {
          this.ngOnInit();
          this.mostrarAlerta(res.message);
        },
        error: (err) => {
          console.error('Error al eliminar', err);
          const mensaje = err.error?.message;
          this.mostrarAlerta(mensaje);
        }
      });
    }
  }

  async mostrarAlerta(mensaje: string) {
    await Swal.fire({
      title: 'Aviso',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'OK',
      heightAuto: false,
    });
  }

  navigateCreate() {
    this.router.navigate(['/creacion/:id'])
  }

  navigateUpdate(id: number) {
    this.router.navigate([`/creacion/${id}`])
  }

}
