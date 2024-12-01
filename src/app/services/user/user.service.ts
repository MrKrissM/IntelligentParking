import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // Asegúrate de tener este servicio de autenticación
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Ajusta esto a tu URL de API

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      // Si no hay token, redirigir al login
      this.router.navigate(['/login']);
      throw new Error('No authentication token found');
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // En user.service.ts
  registerUser(userData: {
    username: string,
    email: string,
    password: string,
    role?: string
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-user`, userData, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }

  // Método para obtener todos los usuarios
  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    // Usa la ruta completa para listar usuarios
    return this.http.get(`${this.apiUrl}/users`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener usuarios:', error);

        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }

        return throwError(error);
      })
    );
  }

  // Método para actualizar un usuario
  updateUser(userId: string, userData: {
    username: string,
    email: string,
    role: string
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    // Cambia el endpoint a /users/
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData, { headers }).pipe(
      catchError(error => {
        console.error('Error al actualizar usuario:', error);

        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }

        return throwError(error);
      })
    );
  }

  // Método para eliminar un usuario
  deleteUser(userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers }).pipe(
      catchError(error => {
        console.error('Error al eliminar usuario:', error);

        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }

        return throwError(error);
      })
    );
  }
}