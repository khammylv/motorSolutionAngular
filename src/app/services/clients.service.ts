import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientData, Clients } from '../models/clients.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}
  baseurl = '/api/client';

  getAllClients(
    id: number,
    pageIndex: number,
    pageSize: number
  ): Observable<ClientData> {
    return this.http.get<ClientData>(
      `${this.baseurl}/company/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  getClients(id: number): Observable<Clients> {
    return this.http.get<Clients>(`${this.baseurl}/${id}`);
  }
   getClientById(id: number): Observable<Clients> {
    return this.http.get<Clients>(`${this.baseurl}/${id}`);
  }
  addClient(client: Clients): Observable<any> {
    return this.http.post<any>(`${this.baseurl}`, client);
  }

  editClient(client: Clients): Observable<any> {
    return this.http.put<any>(`${this.baseurl}`, client);
  }
  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${id}`);
  }
}
