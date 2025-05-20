import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/Company.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
   private baseurl = '/api/company';
  constructor(private http: HttpClient) { }

  getCompany(id: number):Observable< Company>{
   return this.http.get<Company>(`${this.baseurl}/${id}`)
  }
}
