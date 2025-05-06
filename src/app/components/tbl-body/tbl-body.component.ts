import { Component , Input} from '@angular/core';

@Component({
  selector: '[app-tbl-body]',
  standalone: true,
  imports: [],
  templateUrl: './tbl-body.component.html',
  styleUrl: './tbl-body.component.css'
})
export class TblBodyComponent {
  @Input() name!: string;
}
