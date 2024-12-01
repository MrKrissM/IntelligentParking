import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../services/parking/parking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

interface ParkingLot {
  _id?: string;
  name: string;
  address: string;
  floors: number;
  totalSpots: number;
}

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.css'
})
export class ParkingComponent implements OnInit {
  parkingLots: ParkingLot[] = [];
  selectedParkingLot: ParkingLot | null = null;
  parkingSpots: any[] = [];
  
  // Para crear/editar parking lot
  parkingLotForm: ParkingLot = {
    _id: '',
    name: '',
    address: '',
    floors: 1,
    totalSpots: 1
  };
  
  isEditing = false;
  isCreateModalOpen = false;

  constructor(
    private parkingService: ParkingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadParkingLots();
  }

  loadParkingLots() {
    this.parkingService.getParkingLots().subscribe({
      next: (response) => {
        this.parkingLots = response.parkingLots;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al cargar los estacionamientos', error);
      }
    });
  }

 // Método selectParkingLot con verificación
selectParkingLot(parkingLot: ParkingLot) {
  this.selectedParkingLot = parkingLot;
  if (parkingLot._id) {
      this.loadParkingSpots(parkingLot._id);
  } else {
      console.warn('No se pudo cargar los espacios: ID de estacionamiento no disponible');
      // Opcionalmente podrías limpiar los espacios actuales
      this.parkingSpots = [];
  }
}

  loadParkingSpots(parkingLotId: string) {
    this.parkingService.getParkingSpots(parkingLotId).subscribe({
      next: (response: any) => {
        this.parkingSpots = response.parkingSpots;
      },
      error: (error) => {
        console.error('Error al cargar los espacios de estacionamiento', error);
      }
    });
  }

  // Métodos para crear/editar parking lot
  openCreateModal() {
    this.isCreateModalOpen = true;
    this.resetForm();
  }

  resetForm() {
    this.parkingLotForm = {
      name: '',
      address: '',
      floors: 1,
      totalSpots: 1
    };
    this.isEditing = false;
  }

  startEdit(parkingLot: ParkingLot) {
    this.isCreateModalOpen = true;
    this.isEditing = true;
    this.parkingLotForm = { ...parkingLot };
  }

  saveParkingLot() {
    if (this.isEditing && this.parkingLotForm._id) {
      // Actualizar
      this.parkingService.updateParkingLot(this.parkingLotForm._id, this.parkingLotForm)
        .subscribe({
          next: (response) => {
            this.loadParkingLots();
            this.isCreateModalOpen = false;
          },
          error: (error) => {
            console.error('Error al actualizar', error);
            // Aquí podrías agregar un mensaje de error para el usuario
          }
        });
    } else {
      // Crear nuevo - sin enviar _id
      const { _id, ...newParkingLot } = this.parkingLotForm;
      this.parkingService.createParkingLot(newParkingLot)
        .subscribe({
          next: (response) => {
            this.loadParkingLots();
            this.isCreateModalOpen = false;
          },
          error: (error) => {
            console.error('Error al crear', error);
      
          }
        });
    }
  }

  deleteParkingLot(id: string | undefined) {
    if (!id) {
        console.warn('No se puede eliminar: ID de estacionamiento no disponible');
        return;
    }

    if (confirm('¿Está seguro de eliminar este estacionamiento?')) {
        this.parkingService.deleteParkingLot(id)
            .subscribe({
                next: () => {
                    this.loadParkingLots();
                    if (this.selectedParkingLot?._id === id) {
                        this.selectedParkingLot = null;
                        this.parkingSpots = [];
                    }
                },
                error: (error) => {
                    console.error('Error al eliminar', error);
                }
            });
    }
}
}