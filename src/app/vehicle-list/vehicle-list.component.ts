import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-vehicle-list',
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent {
  vehicles = [
    { id: 1, model: 'Toyota Corolla', license: 'ABC123' },
    { id: 2, model: 'Honda Civic', license: 'XYZ789' }
  ];
}
