import { Component , Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MenuItem} from '../../models/menuItem.model';
import { LinkMenuComponent } from '../link-menu/link-menu.component';
@Component({
  selector: 'app-side-menu',
  imports: [MatIconModule, LinkMenuComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  iconName: string = "home";
  @Input() items: MenuItem[] = [];
}
