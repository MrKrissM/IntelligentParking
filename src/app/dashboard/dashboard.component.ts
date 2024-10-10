import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../services/parking.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Datos ficticios para las tarjetas
  availableSpaces: number = 25;
  totalCars: number = 75;
  revenue: number = 1230;

  // Estado de los espacios del estacionamiento (true: ocupado, false: libre)
  parkingSpaces = [
    { id: 1, occupied: true },
    { id: 2, occupied: false },
    { id: 3, occupied: true },
    { id: 4, occupied: false },
    { id: 5, occupied: true },
    { id: 6, occupied: false },
    { id: 7, occupied: true },
    { id: 8, occupied: false },
    { id: 9, occupied: true },
    { id: 10, occupied: false },
    { id: 11, occupied: true },
    { id: 12, occupied: false }
  ];
}
