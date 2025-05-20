import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  show = true;
 

  constructor(private router: Router){
   
  }
  handleClick() {
  
    this.router.navigate(["/home"]);
  
}

}
