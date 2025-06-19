import { Component, OnInit } from '@angular/core';
import { RepairsService } from '../../services/repairs.service';
import { ConfigurationService } from '../../services/configuration.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { VehiclesService } from '../../services/vehicles.service';
import { Vehicle } from '../../models/vehicle.model';
import { Pagination } from '../../models/Pagination.model';
import { RepairsTabComponent } from '../../components/repairs-tab/repairs-tab.component';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { PaginatorTableComponent } from '../../components/paginator-table/paginator-table.component';
import { InformationComponent } from '../../components/information/information.component';

@Component({
  selector: 'app-repairs',
  imports: [CommonModule,MatTabsModule, MatIconModule, RepairsTabComponent,MatExpansionModule,PaginatorTableComponent,InformationComponent],
  templateUrl: './repairs.component.html',
  styleUrl: './repairs.component.css',
})
export class RepairsComponent implements OnInit {
  constructor(
    private repairServices: RepairsService,
    private configurationServices: ConfigurationService,
    private vehiclesServices: VehiclesService,
  ) {}

  repairsSubscription!: Subscription;
  vehicles!: Array<Vehicle>;
  pagination!: Pagination;
  companyId!: number;
  ngOnInit(): void {
    //this.getRepairDescription(1);
    this.pagination = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };
    this.companyId = this.configurationServices.companyId;
    this.getVehiclesByCompany(
      this.companyId,
      this.pagination.pageIndex,
      this.pagination.pageSize
    );
    this.getStatus();
  }
    getVehiclesByCompany(id: number, pageIndex: number, pageSize: number) {
    this.repairsSubscription = this.vehiclesServices
      .getAllVehicle(id, pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.vehicles = data.Data;
          this.pagination = {
            pageIndex: data.PageIndex,
            pageSize: data.PageSize,
            length: data.TotalCount,
          };
        }),
        catchError((error: any) => {
          console.error('Error al obtener vehiculos:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  getAllRepairs() {}

    repairsPagination(pagination: Pagination) {
    this.pagination = pagination;
    this.getVehiclesByCompany(
      this.companyId,
      pagination.pageIndex,
      pagination.pageSize
    );
  }
    getStatus() {
    this.repairsSubscription = this.repairServices
      .getStatus()
      .pipe(
        tap((response) => {
          this.configurationServices.setStatus(response.Roles);
        }),
        catchError((error: any) => {
          console.error('Error:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    if (this.repairsSubscription) {
      this.repairsSubscription.unsubscribe();
    }
  }
}
