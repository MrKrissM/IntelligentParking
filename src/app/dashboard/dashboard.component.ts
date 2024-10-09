import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../services/parking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  parkingLots: any[] = [];

  constructor(private parkingService: ParkingService) {}

  ngOnInit() {
    this.parkingService.getParkingLots().subscribe({
      next: (data) => this.parkingLots = data,
      error: (err) => console.error('Error al obtener estacionamientos', err)
    });
  }
}

