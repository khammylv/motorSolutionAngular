import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BillingTabComponent } from 'app/components/billing-tab/billing-tab.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { InformationComponent } from 'app/components/information/information.component';
import { PaginatorTableComponent } from 'app/components/paginator-table/paginator-table.component';
import { ClientsService } from 'app/services/clients.service';
import { ConfigurationService } from 'app/services/configuration.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { Pagination } from 'app/models/Pagination.model';
import { Clients } from 'app/models/clients.model';

@Component({
  selector: 'app-billing',
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    BillingTabComponent,
    MatExpansionModule,
    InformationComponent,
    PaginatorTableComponent,
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent implements OnInit {
  constructor(
    private clientServices: ClientsService,
    private configurationServices: ConfigurationService
  ) {}
  billingSubscription!: Subscription;
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
  billingPagination(pagination: Pagination) {
    this.pagination = pagination;
    this.getAllClient(
      this.companyId,
      pagination.pageIndex,
      pagination.pageSize
    );
  }
    getAllClient(id: number, pageIndex: number, pageSize: number) {
      this.billingSubscription = this.clientServices
        .getAllClients(id, pageIndex, pageSize)
        .pipe(
          tap((data) => {
            this.clients = data.Data;
            this.pagination = {
              pageIndex: data.PageIndex,
              pageSize: pageSize,
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
    ngOnDestroy(): void {
    if (this.billingSubscription) {
      this.billingSubscription.unsubscribe();
    }
  }
}
