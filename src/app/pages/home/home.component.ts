import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { InputEmailComponent } from '../../components/input-email/input-email.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule,InputPasswordComponent, InputEmailComponent,InputTextComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  companyRegister!: FormGroup;
  companyCode!: number;
  isLoading: boolean = false;
  constructor(private formBuilder: FormBuilder, private sharedServices: SharedService,private router: Router){}
  
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
      CompanyPassword: new FormControl('', Validators.required)
    });
  }
  submitForm() {
    if (this.companyRegister.invalid) {
      return; // No enviar si hay errores
    }
    console.log(this.companyRegister.value)
    this.router.navigate(["/company"]);
  }
}
