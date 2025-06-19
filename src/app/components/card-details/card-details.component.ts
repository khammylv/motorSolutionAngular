import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-details',
  imports: [CommonModule,  MatIconModule],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent {
  @Input() icon!: string;
  @Input() color!: string;
  @Input() placeholder!: string;
  @Input() message!: string;
}
