import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../input-text/input-text.component';
import { NameFormPipe } from '../../pipes/name-form.pipe';
import { LoadingComponent } from '../loading/loading.component';
import { catchError, of, Subscription, tap } from 'rxjs';
import { ConfigurationService } from '../../services/configuration.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../../services/shared.service';
import { ERROR_CLASS, INFO_CLASS } from '../../utils/constanst';
import { RepairsService } from '../../services/repairs.service';
import { EmailSend } from '../../models/Email.model';
import { LoadingService } from '../../services/loading.service';
import { InputEmailComponent } from '../input-email/input-email.component';
import { ClientsService } from '../../services/clients.service';
import { Clients } from '../../models/clients.model';

@Component({
  selector: 'app-form-email',
  imports: [CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputEmailComponent,
   
    LoadingComponent,],
  templateUrl: './form-email.component.html',
  styleUrl: './form-email.component.css'
})
export class FormEmailComponent implements OnInit {
emailSubscription!: Subscription;
isLoading: boolean = false;
actionForm!: FormGroup;
companyCode!: number;
client!: Clients;
constructor(private configurationServices: ConfigurationService,
   @Inject('dialogData') public data: any,
    private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private sharedServices: SharedService,
    private repairServices: RepairsService,
  private loadingService: LoadingService,
private clientServices : ClientsService){}
ngOnInit(): void {

  this.companyCode = this.configurationServices.companyId;
  console.log(this.data.id)
  this.loadingService.show();
  //this.buildForm();
  this.getClient(this.data.id);
}
 buildForm(): void {
    this.actionForm = this.formBuilder.group({
      CompanyCode: new FormControl(
        this.companyCode,
        Validators.required
      ),
      EmailSubject: new FormControl(
        '',
        Validators.required
      ),
      EmailBody: new FormControl(
        '',
        Validators.required
      ),

      EmailReceiver: new FormControl(
       this.client?.Email ||  '',
        [Validators.required]
      ),

     
    });
    this.isLoading = true;
  }
  getClient(id: number){
     this.emailSubscription= this.clientServices
      .getClientById(id)
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
      this.sendEmail(this.actionForm.value)
      // 
      // this.isLoading = false;
}
sendEmail(email: EmailSend){
   this.emailSubscription = this.repairServices
      .sendEmail(email)
      .pipe(
        tap(() => {
          this.loadingService.show()
          this.dialogRef.close({ send: true });
        }),
        catchError((error) => {
          console.error(error);
          this.loadingService.hide();
          this.sharedServices.showSnackbar(
            'Error al enviar mensaje',
            'Error',
            ERROR_CLASS
          );
          return of(null);
        })
      )
      .subscribe();
}
 ngOnDestroy(): void {
    if (this.emailSubscription) {
      this.emailSubscription.unsubscribe();
    }
  }
}
