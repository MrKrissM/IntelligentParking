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
    role: string; // Agregamos el role que viene de la API
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenSubject: BehaviorSubject<string | null>;
  private userRoleSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject(localStorage.getItem('token'));
    this.userRoleSubject = new BehaviorSubject(this.getUserRole());
  }
  setUserRole(role: string) {
    this.userRoleSubject.next(role);
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.tokenSubject.next(response.token);
          this.setUserRole(response.user.role);
        } else {
          console.error("Login fallido: ", response);
        }
      })
    );
  }

    // Método para obtener el rol del usuario
    getUserRole(): string | null {
      const user = this.getUser();
      return user ? user.role : 'guest';
    }
  
    isAdmin(): boolean {
      return this.getUserRole() === 'admin';
    }
  
    isUser(): boolean {
      return this.getUserRole() === 'user';
    }

  logout(): void {
    this.clearSession();
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
    return userString ? JSON.parse(userString) : {};
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }


  

}