import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company, CompanyLogin } from '../models/Company.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
   private baseurl = '/api/company';
   loginUrl= '/api/login';
  constructor(private http: HttpClient) { }

  getCompany(id: number):Observable< Company>{
   return this.http.get<Company>(`${this.baseurl}/${id}`)
  }
  addUser(company: Company):Observable< any>{
  return this.http.post<any>(`${this.baseurl}`, company);
  }
   companyLogin(company:CompanyLogin):Observable<{ token: string }>{
     return this.http.post<{ token: string }>(`${this.loginUrl}/company`, company).pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
   }
}
