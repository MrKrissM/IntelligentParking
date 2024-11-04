import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [RouterOutlet, CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingresa un usuario y contraseña válidos.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        this.loading = false;
        this.router.navigate(['/dashboard']);
        console.log('Token guardado:', localStorage.getItem('token'));
      },
      error: (error) => {
        console.error('Error en el login', error);
        this.loading = false;
        this.errorMessage = error.error?.message || 'Error al iniciar sesión. Por favor, intenta nuevamente.';
      }
    });
  }
}