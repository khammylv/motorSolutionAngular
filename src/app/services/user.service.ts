import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Roles, User, UserData, UserLogin } from '../models/User.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private baseurl = `${environment.apiUrl}/user`;
   private loginUrl = `${environment.apiUrl}/login`;

 getAllUser(id:number, pageIndex: number, pageSize: number):Observable< UserData>{
  return this.http.get<UserData>(`${this.baseurl}/company/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`)
 }

 getUser(id:number):Observable< User>{
  return this.http.get<User>(`${this.baseurl}/${id}`)
 }

 deleteUser(id:number):Observable< any>{
  return this.http.delete<any>(`${this.baseurl}/${id}`)
 }
 
 userLogin(user:UserLogin):Observable<{ token: string }>{
   return this.http.post<{ token: string }>(`${this.loginUrl}/user`, user).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
 }
addUser(user: User):Observable< any>{
return this.http.post<any>(`${this.baseurl}`, user);
}
 getRoles():Observable<{ Roles: Roles }>{
 return this.http.get<{ Roles: Roles }>(`${this.baseurl}/role`);
 }

editUser(user: User):Observable< any>{
return this.http.put<any>(`${this.baseurl}`, user);
}
}
