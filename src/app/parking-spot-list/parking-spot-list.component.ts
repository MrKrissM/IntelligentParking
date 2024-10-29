import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingService } from '../services/parking/parking.service';

@Component({
  selector: 'app-parking-spot-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./parking-spot-list.component.html`,
  styleUrls: ['./parking-spot-list.component.css']
})
export class ParkingSpotListComponent implements OnInit {
  @Input() parkingLotId!: string;
  parkingSpots: any[] = [];

  constructor(private parkingService: ParkingService) {}

  ngOnInit() {
    this.parkingService.getParkingSpots(this.parkingLotId).subscribe({
      next: (data) => this.parkingSpots = data,
      error: (err) => console.error('Error al obtener espacios de estacionamiento', err)
    });
  }
}
