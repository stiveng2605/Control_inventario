import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/data/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: false
})
export class FormComponent  implements OnInit {

  FormProduct!: FormGroup;
  productId!: number;
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private prouctService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {
    this.inicializarform();
  }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.isUpdate = true;
      this.cargarProducto(this.productId);
    }
  }

  inicializarform() {
    this.FormProduct = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(1), Validators.max(9999)]],
    });
  }

  cargarProducto(id: number) {
    this.prouctService.getProductById(id).subscribe(product => {
      this.FormProduct.patchValue(product);
    });
  }

  validForm() {
    if (this.FormProduct.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const formData = this.FormProduct.value;

    if (this.isUpdate) {
      this.prouctService.updateProduct(this.productId, formData).subscribe({
        next: (res) => {
          this.mostrarAlerta(res.message);
          this.FormProduct.reset();
        },
        error: (err) => {
          const mensaje = err.error?.message;
          this.mostrarAlerta(mensaje);
        }
      });

    } else {
      this.prouctService.addProduct(formData).subscribe({
        next: (res) => {
          this.mostrarAlerta(res.message);
          this.FormProduct.reset();
        },
        error: (err) => {
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
    }).then(() => {
      this.router.navigate(['/products']).then(() => {
        window.location.reload();
      });
    });
  }
}
