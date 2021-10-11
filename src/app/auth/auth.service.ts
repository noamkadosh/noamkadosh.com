import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenTimer: any;

  constructor(private store: Store<fromApp.AppState>) { }

  setLogoutTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout());
    }, duration);
  }

  clearLogoutTimer() {
    clearTimeout(this.tokenTimer);
  }
}
