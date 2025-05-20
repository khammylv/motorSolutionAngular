import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { InputEmailComponent } from '../../components/input-email/input-email.component';

@Component({
  selector: 'app-login-company',
  imports: [ReactiveFormsModule,InputPasswordComponent, InputEmailComponent],
  templateUrl: './login-company.component.html',
  styleUrl: './login-company.component.css'
})
export class LoginCompanyComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder){
   
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
    console.log(this.loginForm.value)
  }
}
