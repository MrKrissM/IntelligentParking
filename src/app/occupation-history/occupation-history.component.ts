import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../services/parking.service';
import { ErrorHandlingService } from '../services/error-handling.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-occupation-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./occupation-history.component.html`,
  styleUrls: ['./occupation-history.component.css']
})
export class OccupationHistoryComponent implements OnInit {
  occupations: any[] = [];

  constructor(
    private parkingService: ParkingService,
    private errorService: ErrorHandlingService
  ) {}

  ngOnInit() {
    this.parkingService.getOccupationHistory().subscribe({
      next: (data) => this.occupations = data,
      error: (err) => this.errorService.handleError(err)
    });
  }
}
