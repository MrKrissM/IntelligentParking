import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  availableSpaces: number = 25;
  occupiedSpaces: number = 75;
  dailyRevenue: number = 1230.50;
  activeReservations: number = 8;

  recentActivities = [
    { time: '10:30 AM', description: 'Vehículo ingresó al espacio A-12' },
    { time: '10:15 AM', description: 'Nueva reservación para mañana' },
    { time: '09:45 AM', description: 'Vehículo salió del espacio B-05' },
    { time: '09:30 AM', description: 'Pago recibido por reservación #1234' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Aquí puedes cargar datos reales desde un servicio
  }

  logout() {
    // Implementa la lógica de cierre de sesión aquí
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}