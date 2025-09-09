import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PaginatorTableComponent } from 'app/components/paginator-table/paginator-table.component';
import { InformationComponent } from 'app/components/information/information.component';
import { ButtonIconComponent } from 'app/components/button-icon/button-icon.component';
import { Billings } from 'app/models/Billing.models';
import { Pagination } from 'app/models/Pagination.model';
import { catchError, of, Subscription, tap } from 'rxjs';
import { BillingService } from 'app/services/billing.service';
import { DialogService } from 'app/services/dialog.service';
import { BillingDetailsComponent } from 'app/components/billing-details/billing-details.component';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingComponent } from 'app/components/loading/loading.component';
import { LoadingService } from 'app/services/loading.service';

@Component({
  selector: 'app-billing-tab',
  imports: [
    CommonModule,
    PaginatorTableComponent,
    ButtonIconComponent,
    InformationComponent,
    LoadingComponent
  ],
  templateUrl: './billing-tab.component.html',
  styleUrl: './billing-tab.component.css',
})
export class BillingTabComponent implements OnInit {
  @Input() infoTab!: string;
  @Input() idSearch!: number;
  constructor(private billingServices: BillingService,private dialogService: DialogService,private sanitizer: DomSanitizer,private loadingService: LoadingService,) {}
  billings!: Array<Billings>;
  billingSubscription!: Subscription;
  pagination!: Pagination;
  pdfUrl?: string;

  action: Record<
    string,
    (id: number, pageIndex: number, pageSize: number) => void
  > = {
    company: (id: number, pageIndex: number, pageSize: number) =>
      this.getBillingsByCompany(id, pageIndex, pageSize),
    client: (id: number, pageIndex: number, pageSize: number) =>
      this.getBillingByClient(id, pageIndex, pageSize),
  };
  ngOnInit(): void {
    this.pagination = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };
     this.getAllBilling(
      this.idSearch,
      this.pagination.pageIndex,
      this.pagination.pageSize
    );
  }
  viewBilling(id: number) {
  /*  this.loadingService.show();
   this.billingSubscription = this.billingServices.getFacturaPdf(id).subscribe(blob => {
    this.loadingService.hide();
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(blob)
    ) as string;
  });*/
      this.dialogService
          .openDialog(BillingDetailsComponent, 'Factura', {
            action: 'edit',
            id: id,
            
          },'70vw')
          .afterClosed()
          .subscribe((result) => {
            if (result) {
             
              
            }
          });
  }
  getAllBilling(id: number, pageIndex: number, pageSize: number) {
    this.action[this.infoTab]?.(id, pageIndex, pageSize);
  }
  getBillingByClient(id: number, pageIndex: number, pageSize: number) {
    this.billingSubscription = this.billingServices
      .getBillingByClient(id, pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.billings = data.Data;
          this.pagination = {
            pageIndex: data.PageIndex,
            pageSize: pageSize,
            length: data.TotalCount,
          };
        }),
        catchError((error: any) => {
          console.error('Error al obtener usuario:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  getBillingsByCompany(id: number, pageIndex: number, pageSize: number) {
    this.billingSubscription = this.billingServices
      .getAllBilling(id, pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.billings = data.Data;

          this.pagination = {
            pageIndex: data.PageIndex,
            pageSize: pageSize,
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
  billingPagination(pagination: Pagination) {
    this.pagination = pagination;
    this.getAllBilling(
      this.idSearch,
      pagination.pageIndex,
      pagination.pageSize
    );
  }
  ngOnDestroy(): void {
    if (this.billingSubscription) {
      this.billingSubscription.unsubscribe();
    }
  }
}
