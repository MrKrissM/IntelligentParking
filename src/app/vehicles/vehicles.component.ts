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
  
  // Form data binding con valores iniciales más completos
  vehicleForm = {
    plate: '',
    model: '',
    brand: '',
    color: ''
  };
  
  isEditing = false;
  currentVehicle: Vehicle | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

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

  startEdit(vehicle: Vehicle): void {
    this.isEditing = true;
    this.currentVehicle = { ...vehicle };

    // Copiar todos los datos del vehículo al formulario
    this.vehicleForm = {
      plate: vehicle.plate,
      model: vehicle.model || '',
      brand: vehicle.brand || '',
      color: vehicle.color || ''
    };
  }

  deleteVehicle(vehicle: Vehicle): void {
    if (vehicle.id) {
      this.vehicleService.deleteVehicle(vehicle.id).subscribe({
        next: (success: boolean) => {
          if (success) {
            // Filtrar el vehículo eliminado de la lista local
            this.vehicles = this.vehicles.filter(v => v.id !== vehicle.id);
            console.log('Vehículo eliminado con éxito');
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

  addVehicle(): void {
    // Validación de placa obligatoria
    if (!this.vehicleForm.plate.trim()) {
      alert('La placa es obligatoria');
      return;
    }

    if (this.isEditing && this.currentVehicle) {
      // Modo edición
      const updatedVehicle: Vehicle = {
        ...this.currentVehicle,
        plate: this.vehicleForm.plate,
        model: this.vehicleForm.model || undefined,
        brand: this.vehicleForm.brand || undefined,
        color: this.vehicleForm.color || undefined
      };

      this.vehicleService.updateVehicle(this.currentVehicle.id!, updatedVehicle).subscribe({
        next: (vehicle: Vehicle | null) => {
          if (vehicle) {
            // Actualizar el vehículo en la lista local
            const index = this.vehicles.findIndex(v => v.id === vehicle.id);
            if (index !== -1) {
              this.vehicles[index] = vehicle;
            }
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
        plate: this.vehicleForm.plate,
        model: this.vehicleForm.model || undefined,
        brand: this.vehicleForm.brand || undefined,
        color: this.vehicleForm.color || undefined
      };

      this.vehicleService.createVehicle(newVehicle).subscribe({
        next: (vehicle: Vehicle | null) => {
          if (vehicle) {
            // Agregar el nuevo vehículo a la lista local
            this.vehicles.push(vehicle);
            this.resetForm();
          } else {
            console.error('No se pudo crear el vehículo');
          }
        },
        error: (error) => {
          console.error('Error al agregar vehículo:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentVehicle = null;
    // Reiniciar todos los campos del formulario
    this.vehicleForm = {
      plate: '',
      model: '',
      brand: '',
      color: ''
    };
  }

  cancelEdit(): void {
    this.resetForm();
  }
}