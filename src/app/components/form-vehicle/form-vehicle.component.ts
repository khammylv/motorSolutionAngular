import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NameFormPipe } from 'app/pipes/name-form.pipe';
import { InputTextComponent } from 'app/components/input-text/input-text.component';
import { LoadingComponent } from 'app/components/loading/loading.component';
import { VehiclesService } from 'app/services/vehicles.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfigurationService } from 'app/services/configuration.service';
import { SharedService } from 'app/services/shared.service';
import { LoadingService } from 'app/services/loading.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { Vehicle } from 'app/models/vehicle.model';
import { ERROR_CLASS, INFO_CLASS } from 'app/utils/constanst';

@Component({
  selector: 'app-form-vehicle',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    NameFormPipe,
    LoadingComponent,
  ],
  templateUrl: './form-vehicle.component.html',
  styleUrl: './form-vehicle.component.css',
})
export class FormVehicleComponent implements OnInit {
  vehicleSubscription!: Subscription;
  actionForm!: FormGroup;
  vehicle!: Vehicle;
  clientId!: number;
  vehicleId!: number;
  companyCode!: number;
  isLoading: boolean = false;
  isEditMode: boolean = false;
  actionVehicle!: string;
  constructor(
    @Inject('dialogData') public data: any,
    private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private vehiclesServices: VehiclesService,
    private configurationServices: ConfigurationService,
    private sharedServices: SharedService,
    private loadingService: LoadingService
  ) {}
  
  actionInit: Record<string, (idV: number) => void> = {
    edit: (idV: number) => this.getVehicle(idV),
    add: () => this.addVehicleID(),
  };
  action: Record<string, (vehicle: Vehicle) => void> = {
    edit: (vehicle: Vehicle) => this.editVehicle(vehicle),
    add: (vehicle: Vehicle) => this.addVehicle(vehicle),
  };
  ngOnInit(): void {
    this.clientId = this.data.idClient;
    this.vehicleId = this.sharedServices.generateId();
    this.isEditMode = this.data?.action === 'edit';
    this.actionVehicle = this.data?.action;
    this.companyCode = this.configurationServices.companyId;
    this.actionInit[this.actionVehicle]?.(this.data.id);
    console.log(this.data);
  }

  getVehicle(id: number) {
    this.vehicleSubscription = this.vehiclesServices
      .getVehicle(id)
      .pipe(
        tap((data) => {
          this.vehicle = data;
          this.buildForm();
          this.isLoading = true;
          this.loadingService.hide();
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
  }
  addVehicleID() {
    if (this.vehicleId) {
      this.buildForm();
      this.isLoading = true;
      this.loadingService.hide();
    }
  }
  buildForm(): void {
    this.actionForm = this.formBuilder.group({
      VehicleId: new FormControl(
        this.vehicle?.VehicleId || this.vehicleId,
        Validators.required
      ),
      ClientId: new FormControl(
        this.vehicle?.ClientId || this.clientId,
        Validators.required
      ),
      Brand: new FormControl(this.vehicle?.Brand || '', Validators.required),

      Model: new FormControl(this.vehicle?.Model || '', [Validators.required]),

      Plate: new FormControl(this.vehicle?.Plate || '', [Validators.required]),
      CompanyCode: new FormControl(
        this.vehicle?.CompanyCode || this.companyCode,
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
      this.action[this.actionVehicle]?.(this.actionForm.value);
    }
  
  addVehicle(vehicle: Vehicle) {
    this.vehicleSubscription = this.vehiclesServices
      .addVehicle(vehicle)
      .pipe(
        tap(() => {
          this.loadingService.hide();
          this.dialogRef.close({ add: true });
        }),
        catchError((error) => {
          console.error(error);
          this.loadingService.hide();
          this.sharedServices.showSnackbar(
            'Error al agregar el vehiculo',
            'Error',
            ERROR_CLASS
          );
          return of(null);
        })
      )
      .subscribe();
  }
  editVehicle(vehicle: Vehicle) {
    this.vehicleSubscription = this.vehiclesServices
      .editVehicle(vehicle)
      .pipe(
        tap(() => {
          this.loadingService.hide();
          this.dialogRef.close({ edit: true });
        }),
        catchError((error) => {
          console.error(error);
          this.loadingService.hide();
          this.sharedServices.showSnackbar(
            'Error al editar el vehiculo',
            'Error',
            ERROR_CLASS
          );
          return of(null);
        })
      )
      .subscribe();
  }
}
