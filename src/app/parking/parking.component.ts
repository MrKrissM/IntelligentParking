import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ParkingService } from '../services/parking/parking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

// Definir las interfaces
interface ParkingLot {
  _id?: string;
  name: string;
  address: string;
  floors: number;
  totalSpots: number;
}

interface ParkingSpot {
  _id?: string;
  parkingLotName: string;
  number: string;
  floor: number;
  isOccupied: boolean;
}

// Mover los Pipes a archivos separados
@Pipe({
  name: 'filterByFloor',
  standalone: true
})
export class FilterByFloorPipe implements PipeTransform {
  transform(spots: ParkingSpot[], floor: number): ParkingSpot[] {
    if (!spots) return [];
    return spots.filter(spot => spot.floor === floor);
  }
}

@Pipe({
  name: 'range',
  standalone: true
})
export class RangePipe implements PipeTransform {
  transform(value: number): number[] {
    return value ? Array.from({ length: value }, (_, i) => i) : [];
  }
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
  parkingSpots: ParkingSpot[] = []; // Tipado correcto

  additionalSpots: number = 0;

  parkingLotForm: ParkingLot = {
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

  selectParkingLot(parkingLot: ParkingLot) {
    this.selectedParkingLot = parkingLot;
    if (parkingLot._id) {
      this.loadParkingSpots(parkingLot._id);
    } else {
      console.warn('No se pudo cargar los espacios: ID de estacionamiento no disponible');
      this.parkingSpots = [];
    }
  }

  loadParkingSpots(parkingLotId: string) {
    this.parkingService.getParkingSpots(parkingLotId).subscribe({
      next: (response) => {
        console.log('Spots cargados:', response);
        this.parkingSpots = response.parkingSpots;
      },
      error: (error) => {
        console.error('Error al cargar los espacios de estacionamiento', error);
        this.parkingSpots = [];
      }
    });
  }

  getSpotColor(isOccupied: boolean): string {
    return isOccupied ? 'occupied' : 'available';
  }

  getSpotsByFloor(floor: number): ParkingSpot[] {
    const spotsInFloor = this.parkingSpots.filter(spot => spot.floor === floor);
    
    // Si no hay spots creados todavía, crear spots temporales
    if (spotsInFloor.length === 0 && this.selectedParkingLot) {
      const spotsPerFloor = Math.ceil(this.selectedParkingLot.totalSpots / this.selectedParkingLot.floors);
      const letra = String.fromCharCode(64 + floor); // A = 1, B = 2, etc.
      
      const tempSpots: ParkingSpot[] = [];
      for (let i = 1; i <= spotsPerFloor; i++) {
        // Asegurarse de no exceder el total de espacios
        if ((floor - 1) * spotsPerFloor + i <= this.selectedParkingLot.totalSpots) {
          tempSpots.push({
            parkingLotName: this.selectedParkingLot.name,
            number: `${letra}${i}`,
            floor: floor,
            isOccupied: false
          });
        }
      }
      return tempSpots;
    }
    
    return spotsInFloor;
  }
  getFloorRange(): number[] {
    if (!this.selectedParkingLot) return [];
    return Array.from(
      { length: this.selectedParkingLot.floors }, 
      (_, i) => i + 1
    );
  }

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
      this.parkingService.updateParkingLot(this.parkingLotForm._id, this.parkingLotForm)
        .subscribe({
          next: () => {
            this.loadParkingLots();
            this.isCreateModalOpen = false;
          },
          error: (error) => {
            console.error('Error al actualizar', error);
          }
        });
    } else {
      const { _id, ...newParkingLot } = this.parkingLotForm;
      this.parkingService.createParkingLot(newParkingLot)
        .subscribe({
          next: () => {
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

  addSpots() {
    if (!this.selectedParkingLot?._id || !this.additionalSpots || this.additionalSpots < 1) return;

    this.parkingService.createSpots(this.selectedParkingLot._id, this.additionalSpots)
      .subscribe({
        next: (response) => {
          this.loadParkingLots();
          if (this.selectedParkingLot?._id) {
            this.loadParkingSpots(this.selectedParkingLot._id);
          }
          this.additionalSpots = 0; // Reset el input
        },
        error: (error) => {
          console.error('Error al agregar espacios:', error);
        }
      });
  }

  // Modificar el startEdit para resetear additionalSpots
  startEdition(parkingLot: ParkingLot) {
    this.isCreateModalOpen = true;
    this.isEditing = true;
    this.parkingLotForm = { ...parkingLot };
    this.additionalSpots = 0;
  }

}