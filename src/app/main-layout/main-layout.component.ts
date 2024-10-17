import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

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
