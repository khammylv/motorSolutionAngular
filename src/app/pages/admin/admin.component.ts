import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import {MenuItem} from '../../models/menuItem.model';
import { RouterModule } from '@angular/router';
import { MENU_ITEMS } from '../../utils/constanst';
import { ConfigurationService } from '../../services/configuration.service';
@Component({
  selector: 'app-admin',
  imports: [RouterModule, HeaderComponent, SideMenuComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  menuItems: MenuItem[] = MENU_ITEMS;
  constructor(private configuration : ConfigurationService){}
ngOnInit(): void {
  this.configuration.loadFromStorage();
}




  
}
