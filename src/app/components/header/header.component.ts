import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, ButtonIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router){}
  handleClick() {
  
    this.router.navigate(["/admin/profile"]);
  
}
}
