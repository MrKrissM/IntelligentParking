import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [RouterOutlet,CommonModule,RouterModule,DashboardComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Aquí iría la lógica de autenticación cuando implementes el servicio
    // Por ahora, solo redirigimos al dashboard
    if (this.username && this.password) {
      this.router.navigate(['/dashboard']);
    }
  }
}
