import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // Asegúrate de tener este servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Ajusta esto a tu URL de API

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Método para obtener todos los usuarios
  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get(this.apiUrl, { headers });
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

    return this.http.put(`${this.apiUrl}/${userId}`, userData, { headers });
  }

  // Método para eliminar un usuario
  deleteUser(userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete(`${this.apiUrl}/${userId}`, { headers });
  }
}