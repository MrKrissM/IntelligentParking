import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../services/parking/parking.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


interface ParkingLot {
  _id: string;
  name: string;
  address: string;
  floors: number;
  totalSpots: number;
}

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.css'
})
export class ParkingComponent implements OnInit {
  parkingLots: ParkingLot[] = [];
  selectedParkingLot: ParkingLot | null = null;
  parkingSpots: any[] = [];

  constructor(
    private parkingService: ParkingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Verificar si el usuario está logueado antes de cargar los estacionamientos
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
        if (error.status === 401) {
             // Redirigir al login si no está autorizado
           //  this.authService.logout();
        //     this.router.navigate(['/login']);
        } else {
          console.error('Error al cargar los estacionamientos', error);
        }
      }
    });
  }

  selectParkingLot(parkingLot: ParkingLot) {
    this.selectedParkingLot = parkingLot;
    this.loadParkingSpots(parkingLot._id);
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
}