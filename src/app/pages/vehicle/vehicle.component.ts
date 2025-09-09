import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { PaginatorTableComponent } from 'app/components/paginator-table/paginator-table.component';

import { InformationComponent } from 'app/components/information/information.component';
import { TblItem } from 'app/models/TblItem.model';
import { TBL_VEHICLE } from 'app/utils/constanst';

import { catchError, of, Subscription, tap } from 'rxjs';
import { Pagination } from 'app/models/Pagination.model';

import { ConfigurationService } from 'app/services/configuration.service';
import { VehiclesTabComponent } from 'app/components/vehicles-tab/vehicles-tab.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { ClientsService } from 'app/services/clients.service';
import { Clients } from 'app/models/clients.model';
import { MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-vehicle',
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    VehiclesTabComponent,
    MatExpansionModule,
    InformationComponent,
    PaginatorTableComponent
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent implements OnInit {
  constructor(
   
    private clientServices: ClientsService,
    private configurationServices: ConfigurationService
  ) {}
  tblHeads: TblItem[] = TBL_VEHICLE;
  vehiclesSubscription!: Subscription;
  pagination!: Pagination;
  clients!: Array<Clients>;
  
  companyId!: number;

  ngOnInit(): void {
    this.pagination = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };
    this.companyId = this.configurationServices.companyId;
    this.getAllClient(
      this.companyId,
      this.pagination.pageIndex,
      this.pagination.pageSize
    );
  }

  getAllClient(id: number, pageIndex: number, pageSize: number) {
    this.vehiclesSubscription = this.clientServices
      .getAllClients(id, pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.clients = data.Data;
          this.pagination = {
            pageIndex: data.PageIndex,
            pageSize: data.PageSize,
            length: data.TotalCount,
          };
        }),
        catchError((error: any) => {
          console.error('Error al obtener clientes:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  vehiclePagination(pagination: Pagination) {
    this.pagination = pagination;
    this.getAllClient(
      this.companyId,
      pagination.pageIndex,
      pagination.pageSize
    );
  }

  ngOnDestroy(): void {
    if (this.vehiclesSubscription) {
      this.vehiclesSubscription.unsubscribe();
    }
  }
}
