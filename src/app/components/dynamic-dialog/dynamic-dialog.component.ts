
import { CommonModule } from '@angular/common';
import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dynamic-dialog',
  imports: [CommonModule, MatDialogModule,MatIconModule],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.css'
})
export class DynamicDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
