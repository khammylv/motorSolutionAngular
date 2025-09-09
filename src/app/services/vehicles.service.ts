import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle, vehicleData } from 'app/models/vehicle.model';
import {  Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {}
  
  private baseurl = `${environment.apiUrl}/vehicle`;


  getAllVehicle(
    id: number,
    pageIndex: number,
    pageSize: number
  ): Observable<vehicleData> {
    return this.http.get<vehicleData>(
      `${this.baseurl}/company/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  getVehicleByClient(
    id: number,
    pageIndex: number,
    pageSize: number
  ): Observable<vehicleData> {
    return this.http.get<vehicleData>(
      `${this.baseurl}/client/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseurl}/${id}`);
  }
  addVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post<any>(`${this.baseurl}`, vehicle);
  }
  editVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.put<any>(`${this.baseurl}`, vehicle);
  }
    deleteVehicle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${id}`);
  }
}
