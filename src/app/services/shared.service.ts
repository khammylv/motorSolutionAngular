import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  generateId(){
    const generateId = () => Date.now() + Math.random().toString().replace(/\D/g, "");
    let primeros5 = generateId().slice(0, 5);
    let ultimos5 = generateId().slice(-5);
    return parseInt(primeros5 + ultimos5);
  }
}
