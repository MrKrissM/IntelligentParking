import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getParkingLots(): Observable<any> {
    return this.http.get(`${this.apiUrl}/parkingLots`);
  }

  getParkingSpots(parkingLotId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/parkingSpots/parkinglot/${parkingLotId}`);
  }

  createOccupation(occupationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/occupations`, occupationData);
  }

  endOccupation(occupationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/occupations/${occupationId}/end`, {});
  }

  getActiveOccupations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/occupations/active`);
  }

  getOccupationsByVehicle(plate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/occupations/vehicle/${plate}`);
  }

  getOccupationsByParkingLot(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/occupations/parkinglot/${name}`);
  }

  updateOccupation(id: string, occupationData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/occupations/${id}`, occupationData);
  }

  deleteOccupation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/occupations/${id}`);
  }
  getOccupationHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/occupations/history`);
  }
}
