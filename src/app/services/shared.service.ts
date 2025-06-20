import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
   
})
export class SharedService {

  constructor(private snackbar: SnackbarService, private datePipe: DatePipe) { }
  generateId(){
    const generateId = () => Date.now() + Math.random().toString().replace(/\D/g, "");
    let primeros5 = generateId().slice(0, 5);
    let ultimos5 = generateId().slice(-5);
    return parseInt(primeros5 + ultimos5);
  }
    showSnackbar(mensaje: string, action: string, className: string) {
    this.snackbar.show(mensaje, action, 3000, className);
  }
    formatDate(dateString: string | null | undefined, format: string = 'dd/MM/yyyy HH:mm:ss'): string {
    if (!dateString) return '';
    return this.datePipe.transform(dateString, format) ?? '';
  }
}
