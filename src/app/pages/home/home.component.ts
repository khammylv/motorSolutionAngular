import { Component } from '@angular/core';
import {  FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

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
  constructor(private router: Router){}
  
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
