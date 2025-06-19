import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private snackbar: SnackbarService) { }
  generateId(){
    const generateId = () => Date.now() + Math.random().toString().replace(/\D/g, "");
    let primeros5 = generateId().slice(0, 5);
    let ultimos5 = generateId().slice(-5);
    return parseInt(primeros5 + ultimos5);
  }
    showSnackbar(mensaje: string, action: string, className: string) {
    this.snackbar.show(mensaje, action, 3000, className);
  }
}
