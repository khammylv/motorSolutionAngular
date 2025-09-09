import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextComponent } from 'app/components/input-text/input-text.component';
import { InputEmailComponent } from 'app/components/input-email/input-email.component';
import { NameFormPipe } from 'app/pipes/name-form.pipe';
import { LoadingComponent } from 'app/components/loading/loading.component';
import { Clients } from 'app/models/Client.model';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from 'app/services/clients.service';
import { ConfigurationService } from 'app/services/configuration.service';
import { SharedService } from 'app/services/shared.service';
import { LoadingService } from 'app/services/loading.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { ERROR_CLASS, INFO_CLASS } from 'app/utils/constanst';

@Component({
  selector: 'app-form-clients',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputEmailComponent,
    NameFormPipe,
    LoadingComponent,
  ],
  templateUrl: './form-clients.component.html',
  styleUrl: './form-clients.component.css',
})
export class FormClientsComponent implements OnInit {
  client!: Clients;
  actionForm!: FormGroup;
  isEditMode: boolean = false;
  actionClient!: string;
  isLoading: boolean = false;
  clientId!: number;
  companyCode!: number;
  clientsSubscription!: Subscription;
  constructor(
    @Inject('dialogData') public data: any,
    private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private clientServices: ClientsService,
    private configurationServices: ConfigurationService,
    private sharedServices: SharedService,
    private loadingService: LoadingService,
    
  ) {}

  actionInit: Record<string, (idV: number) => void> = {
    edit: (idV: number) => this.getClient(idV),
    add: () => this.addClientID(),
  };

  action: Record<string, (client: Clients) => void> = {
    edit: (client: Clients) => this.editClient(client),
    add: (client: Clients) => this.addClient(client),
  };

  ngOnInit(): void {
    this.loadingService.show();
    this.isEditMode = this.data?.action === 'edit';
    this.actionClient = this.data?.action;
    this.companyCode = this.configurationServices.companyId;
    this.clientId = this.sharedServices.generateId();
    this.actionInit[this.actionClient]?.(this.data.id);
    
  }
  getClient(id: number) {
    this.clientsSubscription = this.clientServices
      .getClients(id)
      .pipe(
        tap((data) => {
          this.client = data;
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

  addClientID() {
     if (this.clientId) {
      this.buildForm();
      this.isLoading = true;
      this.loadingService.hide();
    }
  }

  buildForm(): void {
    this.actionForm = this.formBuilder.group({
      ClientId: new FormControl(
        this.client?.ClientId || this.clientId,
        Validators.required
      ),
      Name: new FormControl(this.client?.Name || '', Validators.required),
      Email: new FormControl(this.client?.Email || '', [
        Validators.required,
        Validators.email,
      ]),
      Phone: new FormControl(this.client?.Phone || '', [Validators.required]),

      Identification: new FormControl(this.client?.Identification || '', [
        Validators.required,
      ]),
      CompanyCode: new FormControl(
        this.client?.CompanyCode || this.companyCode,
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
    this.action[this.actionClient]?.(this.actionForm.value);
  }

  addClient(client: Clients) {
     this.clientsSubscription = this.clientServices.addClient(client).pipe(
            tap(() => {
             this.loadingService.hide();
             this.dialogRef.close({ add: true });
          }),
          catchError((error) => {
            console.error(error);
            this.loadingService.hide();
            this.sharedServices.showSnackbar("Error al agregar el cliente", "Error", ERROR_CLASS)
            return of(null);
          })
      ).subscribe();
  }
  editClient(client: Clients) {
    
     this.clientsSubscription=  this.clientServices.editClient(client).pipe(
            tap(() => {
             this.loadingService.hide();
            this.dialogRef.close({ edit: true });
          }),
          catchError((error) => {
            console.error(error);
            this.loadingService.hide();
            this.sharedServices.showSnackbar("Error al editar el cliente", "Error", ERROR_CLASS)
            return of(null);
          })
      ).subscribe();
  }
 
  ngOnDestroy(): void {
    if (this.clientsSubscription) {
      this.clientsSubscription.unsubscribe();
    }
  }
}
