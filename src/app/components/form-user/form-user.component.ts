import { Component, Inject } from '@angular/core';
import { InputPasswordComponent } from '../input-password/input-password.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { InputTextComponent } from '../input-text/input-text.component';
import { InputEmailComponent } from '../input-email/input-email.component';
import { User } from '../../models/User.model';
import { CommonModule } from '@angular/common';
import { NameFormPipe } from '../../pipes/name-form.pipe';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [CommonModule,InputPasswordComponent , ReactiveFormsModule, InputTextComponent, InputEmailComponent, NameFormPipe],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent  {
    user: User = {
    UserId: 1,
    UserName: 'Juan Pérez',
    UserEmail: 'juan.perez@example.com',
    UserRole: 'Administrador',
    UserPassword: 'password123', // en una app real, nunca almacenes contraseñas en texto plano
    UserIdentification: '1234567890',
    CompanyCode: 101
  };
  actionForm!: FormGroup;
  isEditMode: boolean = false;
  constructor(@Inject('dialogData') public data: any, private formBuilder: FormBuilder) {
   
    

  }
  ngOnInit(): void {
    this.isEditMode = this.data?.action === 'edit';
    this.actionForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      useremail: new FormControl(this.user?.UserEmail || '', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    if (this.isEditMode) {
      this.actionForm.get('password')?.clearValidators(); // Elimina la validación
    } else {
      this.actionForm.get('password')?.setValidators(Validators.required); // Aplica validación
    }

    // Actualiza la validez del campo de password
    this.actionForm.get('password')?.updateValueAndValidity();
  }

  submitForm() {
   
    if (this.actionForm.invalid) {
      return; // No enviar si hay errores
    }
  
    // Aquí puedes procesar los datos del formulario
    console.log(this.actionForm.value);
  }
 
}
