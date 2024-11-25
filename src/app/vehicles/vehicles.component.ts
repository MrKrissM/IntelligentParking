import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../services/vehicle/vehicle.service';

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

  constructor(private vehicleService: VehicleService) {}
  
  addVehicle(): void {
    const plateInput = (document.getElementById('plate') as HTMLInputElement).value;
    const modelInput = (document.getElementById('model') as HTMLInputElement).value || null;
    const brandInput = (document.getElementById('brand') as HTMLInputElement).value || null;
    const colorInput = (document.getElementById('color') as HTMLInputElement).value || null;

    const newVehicle = {
      plate: plateInput,
      model: modelInput,
      brand: brandInput,
      color: colorInput
    };

    this.vehicleService.createVehicle(newVehicle).subscribe(response => {
      // Manejar la respuesta, como añadir el nuevo vehículo a la lista
      this.vehicles.push(response);
    }, error => {
      console.error('Error al agregar vehículo:', error);
    });
  }
}
