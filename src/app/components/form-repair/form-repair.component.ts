import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { InputTextComponent } from 'app/components/input-text/input-text.component';
import { SharedService } from 'app/services/shared.service';
import { RepairsDetails, RepairsDTO } from 'app/models/repair.model';
import { catchError, of, Subscription, tap } from 'rxjs';
import { RepairsService } from 'app/services/repairs.service';
import { ERROR_CLASS, INFO_CLASS, SUCCES_CLASS } from 'app/utils/constanst';
import { LoadingService } from 'app/services/loading.service';
import { LoadingComponent } from 'app/components/loading/loading.component';

@Component({
  selector: 'app-form-repair',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
     LoadingComponent,
  ],
  templateUrl: './form-repair.component.html',
  styleUrl: './form-repair.component.css',
})
export class FormRepairComponent implements OnInit {
  repairsSubscription!: Subscription;
  actionForm!: FormGroup;
  repairs!: RepairsDTO;
  repairDetails!: RepairsDetails;
  repairsDetails!: RepairsDetails[];
  repairsID!: number;
  repairsDetailsID!: number;
  isLoading: boolean = false;
  isEditMode: boolean = false;
  actionRepair!: string;
  constructor(
    @Inject('dialogData') public data: any,
    private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private sharedServices: SharedService,
    private repairServices: RepairsService,
    private loadingService: LoadingService
  ) {}
  action: Record<string, (repair: RepairsDetails) => void> = {
    edit: (repair: RepairsDetails) => this.editRepair(repair),
    add: (repair: RepairsDetails) => this.addRepair(repair),
  };
  ngOnInit(): void {
    //this.isEditMode = this.data?.action === 'edit';
    console.log(this.data);
    this.repairsID = this.data.id;
    this.repairsDetailsID = this.sharedServices.generateId();
    this.getRepairDescription(this.data.id);
  }
  addRepailsDetails(): void {
    this.isEditMode = false;
    this.actionRepair = 'add';
    if (this.repairsDetailsID) {
      this.buildForm();
      this.isLoading = true;
    }
    console.log(this.repairsDetailsID);
  }
  editRepairDetails(id: number) {
    this.isEditMode = true;
    this.actionRepair = 'edit';
    this.getRepairDetail(id);
  }
  getRepairDescription(id: number) {
    this.repairsSubscription = this.repairServices
      .getRepairDetails(id)
      .pipe(
        tap((data) => {
          this.repairsDetails = data;
          console.log(data);
        }),
        catchError((error: any) => {
          console.error('Error al obtener reparacion:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  getRepairDetail(id: number) {
    this.repairsSubscription = this.repairServices
      .getRepairDetailById(id)
      .pipe(
        tap((data) => {
          this.repairDetails = data;
          this.buildForm();
          this.isLoading = true;
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
  }
  buildForm(): void {
    this.actionForm = this.formBuilder.group({
      RepairDetailsId: new FormControl(
        this.repairDetails?.RepairDetailsId || this.repairsDetailsID,
        Validators.required
      ),
      RepairId: new FormControl(
        this.repairDetails?.RepairId || this.repairsID,
        Validators.required
      ),
      Price: new FormControl(
        this.repairDetails?.Price || '',
        Validators.required
      ),

      RepairServices: new FormControl(
        this.repairDetails?.RepairServices || '',
        [Validators.required]
      ),

      RepairDescription: new FormControl(
        this.repairDetails?.RepairDescription || '',
        [Validators.required]
      ),
    });
  }
  submitForm() {
    if (this.actionForm.invalid) {
      this.sharedServices.showSnackbar(
        'Agregue todos los campos del formulario',
        'Info',
        INFO_CLASS
      );
      return;
    }
    this.loadingService.show();
    this.action[this.actionRepair]?.(this.actionForm.value);

    this.actionForm.reset();
    this.isLoading = false;
  }
  addRepair(repair: RepairsDetails) {
    this.repairsSubscription = this.repairServices
      .addRepairDetails(repair)
      .pipe(
        tap(() => {
          this.loadingService.hide();
          this.dialogRef.close({ add: true });
        }),
        catchError((error) => {
          console.error(error);
          this.loadingService.hide();
          this.sharedServices.showSnackbar(
            'Error al agregar el reparacion',
            'Error',
            ERROR_CLASS
          );
          return of(null);
        })
      )
      .subscribe();
  }
  editRepair(repair: RepairsDetails) {
    this.repairsSubscription = this.repairServices
      .updateRepairDetails(repair)
      .pipe(
        tap(() => {
          this.loadingService.hide();
          this.dialogRef.close({ edit: true });
        }),
        catchError((error) => {
          console.error(error);

          this.sharedServices.showSnackbar(
            'Error al editar el reparacion',
            'Error',
            ERROR_CLASS
          );
          return of(null);
        })
      )
      .subscribe();
  }
  deleteRepairDetails(id: number){
        this.repairsSubscription = this.repairServices
      .deleteRepairDetails(id)
      .pipe(
        tap(() => {
           this.sharedServices.showSnackbar(
            'Detalle de reparación eliminada',
            'succes',
            SUCCES_CLASS
          );
          this.loadingService.hide();
          this.dialogRef.close({ delete: true });
        }),
        catchError((error) => {
          console.error(error);

          this.sharedServices.showSnackbar(
            'Error al eliminar el reparacion',
            'Error',
            ERROR_CLASS
          );
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
