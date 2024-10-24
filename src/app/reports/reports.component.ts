import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  reports: any[] = [];

  constructor() {
    // Aquí puedes agregar algunos datos de ejemplo para simular los reportes.
    this.reports = [
      {
        id: 1,
        title: 'Ocupación de Estacionamiento',
        date: '2024-10-10',
        description: 'Informe detallado de la ocupación del estacionamiento para el día 10 de octubre de 2024.',
        status: 'Completado'
      },
      {
        id: 2,
        title: 'Ingresos Mensuales',
        date: '2024-09-30',
        description: 'Resumen de ingresos generados durante el mes de septiembre de 2024.',
        status: 'Pendiente'
      },
      {
        id: 3,
        title: 'Incidencias de Seguridad',
        date: '2024-10-09',
        description: 'Reporte de las incidencias de seguridad registradas en la última semana.',
        status: 'Completado'
      }
    ];
  }
}
