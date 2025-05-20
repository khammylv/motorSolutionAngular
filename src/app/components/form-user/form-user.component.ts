import { Component, Inject, OnInit } from '@angular/core';
import { InputPasswordComponent } from '../input-password/input-password.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextComponent } from '../input-text/input-text.component';
import { InputEmailComponent } from '../input-email/input-email.component';
import { User } from '../../models/User.model';
import { CommonModule } from '@angular/common';
import { NameFormPipe } from '../../pipes/name-form.pipe';
import { UserService } from '../../services/user.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { SelectOption } from '../../models/TblItem.model';
import { ConfigurationService } from '../../services/configuration.service';
import { InputSelectComponent } from '../input-select/input-select.component';
import { SharedService } from '../../services/shared.service';
import { LoadingComponent } from '../loading/loading.component';
import { LoadingService } from '../../services/loading.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ERROR_CLASS, INFO_CLASS } from '../../utils/constanst';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [
    CommonModule,
    InputPasswordComponent,
    ReactiveFormsModule,
    InputTextComponent,
    InputEmailComponent,
    NameFormPipe,
    InputSelectComponent,
    LoadingComponent,
  ],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css',
})
export class FormUserComponent implements OnInit{
  user!: User;
  options: SelectOption[] = [];
  actionForm!: FormGroup;
  isEditMode: boolean = false;
  actionUser!: string;
  isLoading: boolean = false;
  userId!: number;
  companyCode!: number;
  userSubscription: Subscription | undefined;
  constructor(
    @Inject('dialogData') public data: any,
    private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private userServices: UserService,
    private configurationServices: ConfigurationService,
    private sharedServices: SharedService,
    private loadingService: LoadingService,
    private snackbar: SnackbarService
  ) {}

  actionInit: Record<string, (idV: number) => void> = {
    edit: (idV: number) => this.getUser(idV),
    add: () => this.addUserID(),
  };

  action: Record<string, (user: User) => void> = {
    edit: (user: User) => this.editUser(user),
    add: (user: User) => this.addUser(user),
  };
  ngOnInit(): void {
    this.loadingService.show();
    this.isEditMode = this.data?.action === 'edit';
    this.actionUser = this.data?.action;
    this.companyCode = this.configurationServices.companyId;
    this.userId = this.sharedServices.generateId();
    this.getRoles();
    this.actionInit[this.actionUser]?.(this.data.id);
  }
  getRoles() {
    const roles = this.configurationServices.Roles;
    this.options = Object.entries(roles).map(([key, value]) => ({
      label: value,
      value: key,
    }));
  }
  getUser(id: number) {
   this.userSubscription= this.userServices
      .getUser(id)
      .pipe(
        tap((data) => {
          this.user = data;
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

  addUserID() {
    if (this.userId) {
      this.buildForm();
      this.isLoading = true;
      this.loadingService.hide();
    }
  }

  buildForm(): void {
    this.actionForm = this.formBuilder.group({
      UserId: new FormControl(
        this.user?.UserId || this.userId,
        Validators.required
      ),
      UserName: new FormControl(this.user?.UserName || '', Validators.required),
      UserEmail: new FormControl(this.user?.UserEmail || '', [
        Validators.required,
        Validators.email,
      ]),
      UserRole: new FormControl(this.user?.UserRole || '', [
        Validators.required,
      ]),
      UserPassword: new FormControl(
        '',
        this.isEditMode ? [] : Validators.required
      ),
      UserIdentification: new FormControl(this.user?.UserIdentification || '', [
        Validators.required,
      ]),
      CompanyCode: new FormControl(this.user?.CompanyCode || this.companyCode, [
        Validators.required,
      ]),
    });

    this.actionForm.get('UserPassword')?.updateValueAndValidity();
  }
  submitForm() {
    if (this.actionForm.invalid) {
      this.showSnackbar("Agregue todos los campos del formulario", "Info", INFO_CLASS)
      return;
    }
    this.loadingService.show();
    this.action[this.actionUser]?.(this.actionForm.value);

  }

  addUser(user: User) {
   this.userSubscription = this.userServices.addUser(user).pipe(
          tap(() => {
           this.loadingService.hide();
           this.dialogRef.close({ add: true });
        }),
        catchError((error) => {
          console.error(error);
          this.loadingService.hide();
          this.showSnackbar("Error al agregar el usuario", "Error", ERROR_CLASS)
          return of(null);
        })
    ).subscribe();
    
  }
  editUser(user: User) {
   this.userSubscription=  this.userServices.editUser(user).pipe(
          tap(() => {
           this.loadingService.hide();
          this.dialogRef.close({ edit: true });
        }),
        catchError((error) => {
          console.error(error);
          this.loadingService.hide();
          this.showSnackbar("Error al editar el usuario", "Error", ERROR_CLASS)
          return of(null);
        })
    ).subscribe();
    
    
  }
  showSnackbar(mensaje: string, action: string, className: string) {
    this.snackbar.show(mensaje, action, 3000, className);
  }
    ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
