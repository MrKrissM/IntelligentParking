import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  vehicles = [
    { plate: 'ABC123', brand: 'Toyota', model: 'Corolla', color: 'Rojo', status: 'Estacionado' },
    { plate: 'XYZ789', brand: 'Honda', model: 'Civic', color: 'Negro', status: 'No Estacionado' },
    { plate: 'LMN456', brand: 'Ford', model: 'Focus', color: 'Azul', status: 'Estacionado' },
    { plate: 'JKL321', brand: 'Chevrolet', model: 'Spark', color: 'Blanco', status: 'No Estacionado' },
    { plate: 'QWE987', brand: 'Nissan', model: 'Versa', color: 'Gris', status: 'Estacionado' }
  ];
}
