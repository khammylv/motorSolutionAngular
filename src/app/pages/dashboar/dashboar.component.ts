import { Component, OnInit } from '@angular/core';
import {  statusModel } from 'app/models/repair.model';
import { RepairsService } from 'app/services/repairs.service';
import { ConfigurationService } from 'app/services/configuration.service';
import { catchError, forkJoin, of, Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CompanyService } from 'app/services/company.service';
import { sumaryModel } from 'app/models/Company.model';

@Component({
  selector: 'app-dashboar',
  imports: [CommonModule],
  templateUrl: './dashboar.component.html',
  styleUrl: './dashboar.component.css',
})
export class DashboarComponent implements OnInit{
  statusSumary!: statusModel;
  companyCode!: number;
  companySumary!:sumaryModel;
  dashboardSubscription!: Subscription;
  
  constructor(private repairServices: RepairsService,private configurationServices: ConfigurationService,private companyServices : CompanyService) {}
  ngOnInit(): void {
   this.companyCode = this.configurationServices.companyId;
   this.generateData(this.companyCode);
  }
 generateData(id: number) {
  this.dashboardSubscription = forkJoin({
    status: this.repairServices.getStatusSumary(id).pipe(
      catchError((error) => {
        console.error('Error al obtener status sumary:', error);
        return of(null);
      })
    ),
    company: this.companyServices.getCompanySumary(id).pipe(
      catchError((error) => {
        console.error('Error al obtener company sumary:', error);
        return of(null);
      })
    )
  })
  .pipe(
    tap(({ status, company }) => {
      if (status) {
        this.statusSumary = status.Status;
      }
      if (company) {
        this.companySumary = company.Resumen;
      }
    })
  )
  .subscribe();
}
   ngOnDestroy(): void {
    if (this.dashboardSubscription) {
      this.dashboardSubscription.unsubscribe();
    }
  }
}
