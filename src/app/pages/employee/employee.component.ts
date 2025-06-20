import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { MenuItem } from '../../models/menuItem.model';
import { MENU_ITEMS_EMPLEADO } from '../../utils/constanst';

@Component({
  selector: 'app-employee',
  imports: [RouterModule, HeaderComponent, SideMenuComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
menuItems: MenuItem[] = MENU_ITEMS_EMPLEADO;
}
