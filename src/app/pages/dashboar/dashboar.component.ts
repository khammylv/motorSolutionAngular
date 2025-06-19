import { Component, OnInit } from '@angular/core';
import { Repairs, Status, statusModel } from '../../models/repair.model';
import { RepairsService } from '../../services/repairs.service';
import { ConfigurationService } from '../../services/configuration.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboar',
  imports: [CommonModule],
  templateUrl: './dashboar.component.html',
  styleUrl: './dashboar.component.css',
})
export class DashboarComponent implements OnInit{
  statusSumary!: statusModel;
  companyCode!: number;
  dashboardSubscription!: Subscription;
  
  constructor(private repairServices: RepairsService,private configurationServices: ConfigurationService,) {}
  ngOnInit(): void {
   this.companyCode = this.configurationServices.companyId;
   this.generateData(this.companyCode);
  }
  generateData(id: number) {
     this.dashboardSubscription = this.repairServices
         .getStatusSumary(id)
         .pipe(
           tap((data) => {
            this.statusSumary = data.Status
            
            
           }),
           catchError((error: any) => {
             console.error('Error al obtener status sumary:', error);
             return of(null);
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
