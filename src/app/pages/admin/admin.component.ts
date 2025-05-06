import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import {MenuItem} from '../../models/menuItem.model';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin',
  imports: [RouterModule, HeaderComponent, SideMenuComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  menuItems: MenuItem[] = [
    { name: 'Inicio', icon: 'home', route: '/admin/home' },
    { name: 'Empleados', icon: 'supervisor_account', route: '/admin/user' },
    { name: 'Clientes', icon: 'group', route: '/admin/clients' },
    { name: 'Vehículos', icon: 'time_to_leave', route: '/admin/vehicles' }
  ];
}
