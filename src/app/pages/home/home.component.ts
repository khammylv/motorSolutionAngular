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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  companyRegister!: FormGroup;
  companyCode!: number;
  isLoading: boolean = false;
  constructor(private formBuilder: FormBuilder, private sharedServices: SharedService,private router: Router){}
  
  ngOnInit(): void {
  
    


   
  }

  registerCompany() {
    /*if (this.companyRegister.invalid) {
      return; // No enviar si hay errores
    }*/
   
    this.router.navigate(["/register/company"]);
  }
  login() {
    /*if (this.companyRegister.invalid) {
      return; // No enviar si hay errores
    }*/
   
    this.router.navigate(["/login"]);
  }
}
