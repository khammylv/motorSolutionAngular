import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { InputEmailComponent } from '../../components/input-email/input-email.component';
import { ConfigurationService } from '../../services/configuration.service';
import { UserService } from '../../services/user.service';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';


@Component({
  selector: 'app-login-user',
  imports: [ReactiveFormsModule,InputPasswordComponent, InputEmailComponent],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private configurationServices: ConfigurationService,
    private userServices: UserService,
    private router: Router,
    private snackbar: SnackbarService
  ){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      UserEmail: new FormControl('', Validators.required),
      UserPassword: new FormControl('', Validators.required)
    });
  }
submitForm() {
  if (this.loginForm.invalid) {
    return; // No enviar si hay errores
  }

  this.userServices.userLogin(this.loginForm.value).pipe(
    tap(() => {
      const isAdmin = this.configurationServices.redirectionUser();
      this.router.navigate([isAdmin ? '/admin' : '/empleado']);
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
}
 
}
