import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Productos', url: './products', icon: 'mail' },
    { title: 'Crear Producto', url: './creacion/:id', icon: 'add-circle' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
