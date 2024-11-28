import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map, catchError, tap } from 'rxjs/operators';

// Interfaz para definir la estructura de un vehículo
export interface Vehicle {
  [x: string]: string | undefined;
  id?: string;
  plate: string;
  model?: string;
  brand?: string;
  color?: string;
  type?: string;
}

// Interfaz para manejar diferentes formatos de respuesta
interface ApiResponse {
  ok?: boolean;
  data?: Vehicle[];
  vehicles?: Vehicle[];
  vehicle?: Vehicle;  // Añade esta línea para manejar respuestas con un solo vehículo
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

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<ApiResponse>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      map((response: ApiResponse) => {
        // Mapea los vehículos asegurándote de incluir el ID
        if (response.vehicles) {
          return response.vehicles.map(vehicle => ({
            ...vehicle,
            id: vehicle['_id'] || vehicle.id  // Maneja diferentes formatos de ID
          }));
        }
        return [];
      }),
      catchError(error => {
        console.error('Error al obtener vehículos:', error);
        return of([]);
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
        console.log('Respuesta del backend:', response);
        
        // Verifica la estructura de la respuesta
        if (response.ok && response.data) {
          return response.data[0];
        }
        if (response.vehicle) {
          return response.vehicle;
        }
        if (response.vehicles && response.vehicles.length > 0) {
          return response.vehicles[0];
        }
        
        console.warn('Estructura de respuesta inesperada:', response);
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
        console.log('Respuesta de actualización:', response);
        
        if (response.ok) {
          if (response.data && response.data.length > 0) return response.data[0];
          if (response.vehicle) return response.vehicle;
          if (response.vehicles && response.vehicles.length > 0) return response.vehicles[0];
        }
        
        console.warn('Estructura de respuesta inesperada:', response);
        return null;
      }),
      catchError(error => {
        console.error('Error detallado al actualizar:', error);
        return of(null);
      })
    );
  }

  deleteVehicle(id: string): Observable<boolean> {
    const url = `${this.apiUrl}/${id}`;
    
    return this.http.delete<{ok: boolean}>(url, { headers: this.getHeaders() }).pipe(
      tap(response => console.log('Respuesta de eliminación:', response)),
      map(response => response.ok),
      catchError(error => {
        console.error('Error al eliminar vehículo:', error);
        return of(false);
      })
    );
  }

}