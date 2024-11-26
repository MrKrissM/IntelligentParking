import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map, catchError } from 'rxjs/operators';

// Interfaz para definir la estructura de un vehículo
export interface Vehicle {
  id?: string;
  plate: string;
  model?: string;
  brand?: string;
  color?: string;
}

// Interfaz para manejar diferentes formatos de respuesta
interface ApiResponse {
  ok?: boolean;
  data?: Vehicle[];
  vehicles?: Vehicle[];
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/api/vehicles';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Método privado para obtener los headers con el token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Método para obtener vehículos con manejo de diferentes estructuras de respuesta
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<ApiResponse>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      map((response: ApiResponse) => {
        // Intenta diferentes formas de obtener el array de vehículos
        if (Array.isArray(response)) {
          return response;
        }
        if (response.vehicles && Array.isArray(response.vehicles)) {
          return response.vehicles;
        }
        if (response.data && Array.isArray(response.data)) {
          return response.data;
        }
        console.warn('Estructura de respuesta inesperada:', response);
        return [];
      }),
      catchError(error => {
        console.error('Error al obtener vehículos:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }

  getVehicleByPlate(plate: string): Observable<Vehicle | null> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/vehicle/${plate}`, { headers: this.getHeaders() }).pipe(
      map((response: ApiResponse) => {
        // Maneja diferentes estructuras de respuesta
        if (response.data && response.data.length > 0) {
          return response.data[0];
        }
        if (response.vehicles && response.vehicles.length > 0) {
          return response.vehicles[0];
        }
        return null;
      }),
      catchError(error => {
        console.error('Error al obtener vehículo por placa:', error);
        return of(null);
      })
    );
  }

  createVehicle(vehicleData: Vehicle): Observable<Vehicle | null> {
    return this.http.post<ApiResponse>(this.apiUrl, vehicleData, { headers: this.getHeaders() }).pipe(
      map((response: ApiResponse) => {
        // Intenta obtener el vehículo creado de diferentes formas
        if (response.data && response.data.length > 0) {
          return response.data[0];
        }
        if (response.vehicles && response.vehicles.length > 0) {
          return response.vehicles[0];
        }
        return null;
      }),
      catchError(error => {
        console.error('Error al crear vehículo:', error);
        return of(null);
      })
    );
  }

  updateVehicle(id: string, vehicleData: Vehicle): Observable<Vehicle | null> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}`, vehicleData, { headers: this.getHeaders() }).pipe(
      map((response: ApiResponse) => {
        // Maneja diferentes estructuras de respuesta
        if (response.data && response.data.length > 0) {
          return response.data[0];
        }
        if (response.vehicles && response.vehicles.length > 0) {
          return response.vehicles[0];
        }
        return null;
      }),
      catchError(error => {
        console.error('Error al actualizar vehículo:', error);
        return of(null);
      })
    );
  }

  deleteVehicle(id: string): Observable<boolean> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      map((response: ApiResponse) => {
        // Verifica si la operación fue exitosa
        return response.ok === true;
      }),
      catchError(error => {
        console.error('Error al eliminar vehículo:', error);
        return of(false);
      })
    );
  }
}