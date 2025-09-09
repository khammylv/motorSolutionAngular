import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPasswordComponent } from 'app/components/input-password/input-password.component';
import { SharedService } from 'app/services/shared.service';
import { Router } from '@angular/router';
import { CompanyService } from 'app/services/company.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { SnackbarService } from 'app/services/snackbar.service';

@Component({
  selector: 'app-create-company',
  imports: [CommonModule, ReactiveFormsModule,InputPasswordComponent],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent implements OnInit{
 companyRegister!: FormGroup;
  companyCode!: number;
  isLoading: boolean = false;
  companySubscription!: Subscription;
  constructor(private formBuilder: FormBuilder, 
    private sharedServices: SharedService,
    private router: Router,
    private companyService : CompanyService,
    private snackbar: SnackbarService
  ){}
    ngOnInit(): void {
  
    

    this.companyCode = this.sharedServices.generateId();
    if(this.companyCode){
      this.buildForm();
      this.isLoading = true;
    }
    

   
  }
    buildForm(): void {
    this.companyRegister = this.formBuilder.group({
      CompanyCode: new FormControl(this.companyCode || '', Validators.required),
      CompanyName: new FormControl('', Validators.required),
      Nit: new FormControl('', Validators.required),
      CompanyAddress: new FormControl('', Validators.required),
      CompanyPhone: new FormControl('', Validators.required),
      CompanyEmail: new FormControl('', Validators.required),
      LegalRepresentative: new FormControl('', Validators.required),
      CompanyPassword: new FormControl('', Validators.required),
      PasswordEmail: new FormControl('', Validators.required),
      Status: new FormControl('activo', Validators.required)
    });
  }
  submitForm() {
    if (this.companyRegister.invalid) {
      return; // No enviar si hay errores
    }
    this.companySubscription =this.companyService.addUser(this.companyRegister.value).pipe(
        tap(() => {
          
          this.router.navigate(["/login/company"]);
        }),
        catchError(error => {
        
          this.snackbar.show(
            `Ha ocurrido un error`,
            'Info',
            3000,
            'mdc-snackbar--error'
          );
          console.error(error);
         
          return of(null);
        })
      ).subscribe();
    
    //this.router.navigate(["/company"]);
  }
  ngOnDestroy(): void {
    if (this.companySubscription) {
      this.companySubscription.unsubscribe();
    }
  }
}
