import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private apiUrl = 'http://localhost:3000/api/parkingLots';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('No authentication token found');
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Métodos para CRUD de Parking Lots
  createParkingLot(parkingLotData: any): Observable<any> {
    // Crea una nueva copia del objeto sin el _id
    const { _id, ...dataToSend } = parkingLotData;
    
    return this.http.post(this.apiUrl, dataToSend, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getParkingLots(): Observable<any> {
    return this.http.get(this.apiUrl, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getParkingLotById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  updateParkingLot(id: string, parkingLotData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, parkingLotData, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  deleteParkingLot(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Método para manejar errores de manera centralizada
  private handleError(error: any) {
    console.error('An error occurred:', error);
    
    if (error.status === 401) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    
    return throwError(() => error);
  }

  getParkingSpots(parkingLotId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${parkingLotId}/spots`, { 
        headers: this.getHeaders() 
    }).pipe(
        catchError(this.handleError.bind(this))
    );
}

  createOccupation(occupationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/occupations`, occupationData);
  }


}