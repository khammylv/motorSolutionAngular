import { Component,Input } from '@angular/core';
import {TblItem} from '../../models/TblItem.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: '[app-tbl-heads]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tbl-heads.component.html',
  styleUrl: './tbl-heads.component.css'
})
export class TblHeadsComponent {
  @Input() items: TblItem[] = [];
}
