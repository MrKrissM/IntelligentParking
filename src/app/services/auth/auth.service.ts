import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of } from 'rxjs';
import { Router } from '@angular/router';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  ok: boolean;
  token: string;
  user: {
    id: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.tokenSubject.next(response.token);
        }
      })
    );
  }

  logout(): void {
    console.log("Token antes de hacer logout:", this.getToken());
    this.clearSession();
    console.log("Token después de hacer logout:", this.getToken());

  }

  private clearSession(): void {
    console.log("Cierre de sesión en progreso...");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getUser(): any {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime; // Retorna true si ha expirado
  }

}