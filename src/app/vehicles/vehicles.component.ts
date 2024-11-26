import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService, Vehicle } from '../services/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  
  // Variables para manejar el modo de edición
  isEditing = false;
  currentVehicle: Vehicle | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  // Método para cargar vehículos
  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
        console.log('Vehículos cargados:', this.vehicles);
      },
      error: (error) => {
        console.error('Error al cargar vehículos:', error);
        this.vehicles = [];
      }
    });
  }

  // Método para iniciar la edición
  startEdit(vehicle: Vehicle): void {
    this.isEditing = true;
    this.currentVehicle = { ...vehicle }; // Crea una copia para evitar modificaciones directas

    // Llenar los inputs con los datos del vehículo
    const plateInput = document.getElementById('plate') as HTMLInputElement;
    const modelInput = document.getElementById('model') as HTMLInputElement;
    const brandInput = document.getElementById('brand') as HTMLInputElement;
    const colorInput = document.getElementById('color') as HTMLInputElement;

    plateInput.value = vehicle.plate;
    modelInput.value = vehicle.model || '';
    brandInput.value = vehicle.brand || '';
    colorInput.value = vehicle.color || '';
  }

  // Método para eliminar un vehículo
  deleteVehicle(vehicle: Vehicle): void {
    if (vehicle.id) {
      this.vehicleService.deleteVehicle(vehicle.id).subscribe({
        next: (success: boolean) => {
          if (success) {
            console.log('Vehículo eliminado con éxito');
            this.loadVehicles();
          } else {
            console.error('No se pudo eliminar el vehículo');
          }
        },
        error: (error) => {
          console.error('Error al eliminar vehículo:', error);
        }
      });
    }
  }

  // Método para agregar/actualizar vehículo
  addVehicle(): void {
    const plateInput = document.getElementById('plate') as HTMLInputElement;
    const modelInput = document.getElementById('model') as HTMLInputElement;
    const brandInput = document.getElementById('brand') as HTMLInputElement;
    const colorInput = document.getElementById('color') as HTMLInputElement;

    if (this.isEditing && this.currentVehicle) {
      // Modo edición
      const updatedVehicle: Vehicle = {
        ...this.currentVehicle,
        plate: plateInput.value,
        model: modelInput.value || undefined,
        brand: brandInput.value || undefined,
        color: colorInput.value || undefined
      };

      this.vehicleService.updateVehicle(this.currentVehicle.id!, updatedVehicle).subscribe({
        next: (vehicle: Vehicle | null) => {
          if (vehicle) {
            this.loadVehicles();
            this.resetForm();
          }
        },
        error: (error) => {
          console.error('Error al actualizar vehículo:', error);
        }
      });
    } else {
      // Modo añadir nuevo
      const newVehicle: Vehicle = {
        plate: plateInput.value,
        model: modelInput.value || undefined,
        brand: brandInput.value || undefined,
        color: colorInput.value || undefined
      };

      this.vehicleService.createVehicle(newVehicle).subscribe({
        next: (vehicle: Vehicle | null) => {
          if (vehicle) {
            this.loadVehicles();
            this.resetForm();
          }
        },
        error: (error) => {
          console.error('Error al agregar vehículo:', error);
        }
      });
    }
  }

  // Método para resetear el formulario
  resetForm(): void {
    this.isEditing = false;
    this.currentVehicle = null;

    const plateInput = document.getElementById('plate') as HTMLInputElement;
    const modelInput = document.getElementById('model') as HTMLInputElement;
    const brandInput = document.getElementById('brand') as HTMLInputElement;
    const colorInput = document.getElementById('color') as HTMLInputElement;

    plateInput.value = '';
    modelInput.value = '';
    brandInput.value = '';
    colorInput.value = '';
  }

  // Método para cancelar la edición
  cancelEdit(): void {
    this.resetForm();
  }
}