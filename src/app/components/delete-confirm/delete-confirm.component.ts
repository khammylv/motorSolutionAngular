import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm',
  imports: [],
  templateUrl: './delete-confirm.component.html',
  styleUrl: './delete-confirm.component.css'
})
export class DeleteConfirmComponent {
constructor(@Inject('dialogData') public data: any,private dialogRef: MatDialogRef<any>){}

 delete(){
  this.dialogRef.close({ delete: true })
 }
 cancel(){
  this.dialogRef.close();
 }
}
