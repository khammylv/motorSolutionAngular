import { Component, Inject, OnInit } from '@angular/core';
import { RepairsService } from '../../services/repairs.service';
import { BillingService } from '../../services/billing.service';
import { Billings } from '../../models/Billing.models';
import { RepairsDetails } from '../../models/repair.model';
import { catchError, of, Subscription, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing-details',
  imports: [CommonModule],
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.css',
})
export class BillingDetailsComponent implements OnInit {
  billingsSubscription!: Subscription;
  billing!: Billings;
  repairDetails!: RepairsDetails[];
  constructor(
    @Inject('dialogData') public data: any,
    private repairServices: RepairsService,
    private billingServices: BillingService
  ) {}
  ngOnInit(): void {
    console.log(this.data.id)
    this.getBillings(this.data.id);
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

}
