import { Component, Inject, OnInit } from '@angular/core';
import { RepairsService } from 'app/services/repairs.service';
import { BillingService } from 'app/services/billing.service';
import { Billings } from 'app/models/Billing.models';
import { RepairsDetails } from 'app/models/repair.model';
import { catchError, of, Subscription, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'app/components/loading/loading.component';
import { LoadingService } from 'app/services/loading.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-billing-details',
  imports: [CommonModule,LoadingComponent],
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.css',
})
export class BillingDetailsComponent implements OnInit {
  billingsSubscription!: Subscription;
  billing!: Billings;
  pdfUrl?: string;
  repairDetails!: RepairsDetails[];
  constructor(
    @Inject('dialogData') public data: any,
    private repairServices: RepairsService,
    private billingServices: BillingService,
    private loadingService: LoadingService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    console.log(this.data.id)
    //this.getBillings(this.data.id);
    this.getBillingPdf(this.data.id);
  }
  getBillingPdf(id: number){
     this.loadingService.show();
   this.billingsSubscription = this.billingServices.getFacturaPdf(id).subscribe(blob => {
    this.loadingService.hide();
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(blob)
    ) as string;
  });
  }

  getBillings(id: number): void {
  this.billingsSubscription = this.billingServices.getBillingById(id).pipe(
    switchMap((billing) => {
      this.billing = billing;
      return this.repairServices.getRepairDetails(billing.RepairId);
    }),
    tap((repairDetails) => {
      this.repairDetails = repairDetails;
    }),
    catchError((error) => {
      console.error('Error al obtener datos de la factura o reparación:', error);
      return of(null);
    })
  ).subscribe();
}
verFactura() {
  this.loadingService.show();
  const id = this.data.id;
  this.billingsSubscription = this.billingServices.getFacturaPdf(id).subscribe(blob => {
    this.loadingService.hide();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'factura.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  });
}

 ngOnDestroy(): void {
    if (this.billingsSubscription) {
      this.billingsSubscription.unsubscribe();
    }
  }
}
