import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TblHeadsComponent } from '../../components/tbl-heads/tbl-heads.component';
import { TblBodyComponent } from '../../components/tbl-body/tbl-body.component';
import { PaginatorTableComponent } from '../../components/paginator-table/paginator-table.component';
import { ButtonIconComponent } from '../../components/button-icon/button-icon.component';
import { InformationComponent } from '../../components/information/information.component';
import { TblItem } from '../../models/TblItem.model';
import { TBL_VEHICLE } from '../../utils/constanst';
import { Vehicle } from '../../models/vehicle.model';
import { catchError, of, Subscription, tap } from 'rxjs';
import { Pagination } from '../../models/Pagination.model';
import { DialogService } from '../../services/dialog.service';
import { VehiclesService } from '../../services/vehicles.service';
import { ConfigurationService } from '../../services/configuration.service';
import { VehiclesTabComponent } from '../../components/vehicles-tab/vehicles-tab.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedService } from '../../services/shared.service';
import { ClientsService } from '../../services/clients.service';
import { Clients } from '../../models/clients.model';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';

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
    private dialogService: DialogService,
    private vehiclesServices: VehiclesService,
    private sharedServices: SharedService,
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
