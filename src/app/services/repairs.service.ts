import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RepairData,
  Repairs,
  RepairsDetails,
  RepairsDTO,
  RepairStatus,
  Status
} from 'app/models/repair.model';
import { Roles } from 'app/models/User.model';
import { EmailSend } from 'app/models/Email.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RepairsService {
  constructor(private http: HttpClient) {}
  private baseurl = `${environment.apiUrl}/repair`;
  private baseurlDetails = `${environment.apiUrl}/repair-details`;
  private baseurlDetail = `${environment.apiUrl}/repair-detail`;
  private emailUrl = `${environment.apiUrl}/repair-email`;
  
  getAllRepair(
    id: number,
    pageIndex: number,
    pageSize: number
  ): Observable<RepairData> {
    return this.http.get<RepairData>(
      `${this.baseurl}/company/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }

  getRepairByClient(
    id: number,
    pageIndex: number,
    pageSize: number
  ): Observable<RepairData> {
    return this.http.get<RepairData>(
      `${this.baseurl}/client/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  getRepairByVehicle(
    id: number,
    pageIndex: number,
    pageSize: number
  ): Observable<RepairData> {
    return this.http.get<RepairData>(
      `${this.baseurl}/vehicle/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  getRepairDetails(id: number): Observable<RepairsDetails[]> {
    return this.http.get<RepairsDetails[]>(`${this.baseurlDetails}/${id}`);
  }
  addRepairDetails(repairDetails: RepairsDetails): Observable<any> {
    return this.http.post<any>(`${this.baseurlDetails}`, repairDetails);
  }

  updateRepairDetails(repairDetails: RepairsDetails): Observable<any> {
    return this.http.put<any>(`${this.baseurlDetails}`, repairDetails);
  }

  getRepairDetailById(id: number): Observable<RepairsDetails> {
    return this.http.get<RepairsDetails>(`${this.baseurlDetail}/${id}`);
  }
  deleteRepair(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${id}`);
  }
  deleteRepairDetails(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseurlDetails}/${id}`);
  }
  getRepair(id: number): Observable<Repairs> {
    return this.http.get<Repairs>(`${this.baseurl}/${id}`);
  }
  addRepair(repair: RepairsDTO): Observable<any> {
    return this.http.post<any>(`${this.baseurl}`, repair);
  }
  doneRepair(repair: RepairsDTO): Observable<any> {
    return this.http.patch<any>(`${this.baseurl}`, repair);
  }

  sendEmail(email: EmailSend): Observable<any> {
    return this.http.post<any>(`${this.emailUrl}`, email);
  }
  changeStatus(id: number, status: RepairStatus): Observable<any> {
    return this.http.patch<any>(`${this.baseurl}/status/${id}`, status);
  }

  editRepair(repair: RepairsDTO): Observable<any> {
    return this.http.put<any>(`${this.baseurl}`, repair);
  }

  getStatus(): Observable<{ Roles: Roles }> {
    return this.http.get<{ Roles: Roles }>(`${this.baseurl}/enum-status`);
  }

  getStatusSumary(id: number): Observable<Status> {
    return this.http.get<Status>(
      `${this.baseurl}/status-summary/${id}`
    );
  }
}
