import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor() { }
  private refreshSubject = new BehaviorSubject<void>(undefined);
    
    refresh$ = this.refreshSubject.asObservable();

   triggerRefresh() {
    this.refreshSubject.next();
  }
}
