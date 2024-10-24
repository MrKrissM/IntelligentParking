import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,RouterOutlet],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  reservations: any[] = [];

  constructor() {
    // Aquí podrías agregar datos de ejemplo o hacer una llamada a un servicio para obtener las reservaciones.
    this.reservations = [
      {
        id: 1,
        vehicle: 'Toyota Corolla',
        plateNumber: 'ABC123',
        spot: 'A1',
        date: '2024-10-10',
        time: '08:00 AM',
        status: 'Activa'
      },
      {
        id: 2,
        vehicle: 'Honda Civic',
        plateNumber: 'XYZ789',
        spot: 'B3',
        date: '2024-10-11',
        time: '09:30 AM',
        status: 'Finalizada'
      },
      {
        id: 3,
        vehicle: 'Ford Focus',
        plateNumber: 'LMN456',
        spot: 'C2',
        date: '2024-10-12',
        time: '10:15 AM',
        status: 'Activa'
      }
    ];
  }
}



