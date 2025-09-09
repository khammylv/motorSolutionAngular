import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company, CompanyLogin, Sumary } from 'app/models/Company.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  
   private baseurl = `${environment.apiUrl}/company`;
   private loginUrl=  `${environment.apiUrl}/login`;
 
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

    getCompanySumary(id: number): Observable<Sumary> {
       return this.http.get<Sumary>(
         `${this.baseurl}/sumary/${id}`
       );
     }
}
