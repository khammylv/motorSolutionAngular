import { Component , Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MenuItem} from '../../models/menuItem.model';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-link-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule ],
  templateUrl: './link-menu.component.html',
  styleUrl: './link-menu.component.css'
})
export class LinkMenuComponent {
  @Input() items: MenuItem[] = [];
}
