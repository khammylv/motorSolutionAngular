import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { billingData, Billings, BillingsDTO } from '../models/Billing.models';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(private http: HttpClient) {}
  private baseurl = '/api/billing';

  getAllBilling(
    id: number,
    pageIndex: number,
    pageSize: number
  ): Observable<billingData> {
    return this.http.get<billingData>(
      `${this.baseurl}/company/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  getBillingByClient(
    id: number,
    pageIndex: number,
    pageSize: number
  ): Observable<billingData> {
    return this.http.get<billingData>(
      `${this.baseurl}/client/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }

  addBilling(billing: BillingsDTO): Observable<any> {
    return this.http.post<any>(`${this.baseurl}`, billing);
  }
   getBillingById(id: number): Observable<Billings> {
      return this.http.get<Billings>(`${this.baseurl}/full/${id}`);
    }
    getFacturaPdf(id: number) {
    return this.http.get(`${this.baseurl}/pdf/${id}`, {
      responseType: 'blob' 
    });
  }
}
