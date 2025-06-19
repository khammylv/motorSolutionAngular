import { Component, Inject, OnInit } from '@angular/core';
import { catchError, of, Subscription, tap } from 'rxjs';
import { RepairsService } from '../../services/repairs.service';
import { CommonModule } from '@angular/common';
import { StatusClassPipe } from '../../pipes/status-class.pipe';
import { FirstLetterUppercasePipe } from '../../pipes/first-letter-uppercase.pipe';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { Repairs, RepairsDetails } from '../../models/repair.model';
import { BillingService } from '../../services/billing.service';
import { SharedService } from '../../services/shared.service';
import { ERROR_CLASS, SUCCES_CLASS } from '../../utils/constanst';
import { BillingsDTO } from '../../models/Billing.models';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-repir-details',
  imports: [
    CommonModule,
    StatusClassPipe,
    FirstLetterUppercasePipe,
    CardDetailsComponent,
  ],
  templateUrl: './repir-details.component.html',
  styleUrl: './repir-details.component.css',
})
export class RepirDetailsComponent implements OnInit {
  repairsSubscription!: Subscription;
  pendiente = 'completado';
  repair!: Repairs;
  repairDetails!: RepairsDetails[];
  totalprice!: number;
  billingId!: number;
  constructor(
    @Inject('dialogData') public data: any,
    private repairServices: RepairsService,
    private billingServices: BillingService,
    private sharedServices: SharedService,
    private configurationServices: ConfigurationService
  ) {}
  ngOnInit(): void {
    this.getRepair(this.data.id);
    this.getRepairDescription(this.data.id);
    this.billingId = this.sharedServices.generateId();
  }
  getRepairDescription(id: number) {
    this.repairsSubscription = this.repairServices
      .getRepairDetails(id)
      .pipe(
        tap((data) => {
          this.repairDetails = data;

          this.totalprice = this.repairDetails.reduce(
            (sum, item) => sum + item.Price,
            0
          );
        }),
        catchError((error: any) => {
          console.error('Error al obtener reparacion:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  onCreateBilling() {
    const billingDto: BillingsDTO = {
      BillingId: this.billingId,
      RepairId: this.repair.RepairId,
      ClientId: this.repair.ClientId as number,
      Amount: this.totalprice,
      CompanyCode: this.configurationServices.companyId,
    };
    this.createBilling(billingDto);
    
  }
  createBilling(billing: BillingsDTO) {
    this.repairsSubscription = this.billingServices
      .addBilling(billing)
      .pipe(
        tap(() => {
          this.sharedServices.showSnackbar(
            'Factura generada exitosamente',
            'Success',
            SUCCES_CLASS
          );
        }),
        catchError((error: any) => {
          this.sharedServices.showSnackbar(error.error, 'error', ERROR_CLASS);
          console.error('Error al obtener usuario:', error.error);
          return of(null);
        })
      )
      .subscribe();
  }
  getRepair(id: number) {
    this.repairsSubscription = this.repairServices
      .getRepair(id)
      .pipe(
        tap((data) => {
          this.repair = data;
        }),
        catchError((error: any) => {
          console.error('Error al obtener reparacion:', error);
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
