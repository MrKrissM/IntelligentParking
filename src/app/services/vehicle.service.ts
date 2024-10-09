import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/api/vehicles';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getVehicleByPlate(plate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicle/${plate}`);
  }

  createVehicle(vehicleData: any): Observable<any> {
    return this.http.post(this.apiUrl, vehicleData);
  }

  updateVehicle(id: string, vehicleData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, vehicleData);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}