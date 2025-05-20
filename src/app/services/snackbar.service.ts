import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  show(message: string, action: string , duration: number, panelClass: string ): void {
    this.snackBar.open(message, action,  {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: panelClass ? [panelClass] : undefined
    });
  }
}
