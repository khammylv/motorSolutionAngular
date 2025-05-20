import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$ = this._isLoading.asObservable();
  constructor() {}

  show(): void {
    this._isLoading.next(true);
  }

  hide(): void {
    this._isLoading.next(false);
  }
}
