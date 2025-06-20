import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, ButtonIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, private configurationServices: ConfigurationService){}
  handleClick() {
    console.log(this.configurationServices.isAdmin)
    if(this.configurationServices.isAdmin){
       this.router.navigate(["/admin/profile"]);
    }else{
      this.router.navigate(["/user/profile"]);
    }
   
  
}
}
