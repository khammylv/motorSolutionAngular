import { Component } from '@angular/core';
import { MenuItem } from '../../models/menuItem.model';
import { MENU_ITEMS } from '../../utils/constanst';

@Component({
  selector: 'app-company',
  imports: [],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
menuItems: MenuItem[] = MENU_ITEMS;
}
