import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsNotFoundService {
  private isNotFound = new BehaviorSubject<boolean>(false);
  isNotFoundObservable = this.isNotFound.asObservable();

  constructor() { }

  pageNotFound() {
    this.isNotFound.next(!this.isNotFound.value)
  }
}
