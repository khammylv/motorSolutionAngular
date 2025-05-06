import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl, ReactiveFormsModule} from '@angular/forms';
import { InputPasswordComponent } from "../../components/input-password/input-password.component";
import { InputEmailComponent } from '../../components/input-email/input-email.component';

@Component({
  selector: 'app-login',
  imports: [InputPasswordComponent, ReactiveFormsModule, InputEmailComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  show = true;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder ){
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }
  submitForm() {
    console.log(this.loginForm.value)
  }
}
