import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { InputEmailComponent } from '../../components/input-email/input-email.component';
import { SnackbarService } from '../../services/snackbar.service';
import { CompanyService } from '../../services/company.service';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-login-company',
  imports: [ReactiveFormsModule,InputPasswordComponent, InputEmailComponent],
  templateUrl: './login-company.component.html',
  styleUrl: './login-company.component.css'
})
export class LoginCompanyComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private companyService : CompanyService,
    private router: Router,
    private configurationServices: ConfigurationService,
    private snackbar: SnackbarService){
   
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      CompanyEmail: new FormControl('', Validators.required),
      CompanyPassword: new FormControl('', Validators.required)
    });
  }
  submitForm() {
    if (this.loginForm.invalid) {
      return; // No enviar si hay errores
    }
    
      this.companyService.companyLogin(this.loginForm.value).pipe(
        tap(() => {
         
          this.router.navigate(["/admin"]);
          this.configurationServices.setInfo()
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
    //console.log(this.loginForm.value)
  }
}
