import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ErrorComponent } from '../shared/components/error/error.component';
import { ErrorService } from '../shared/services/error.service';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit, OnDestroy  {

  loginMode: boolean = true;
  isLoading: boolean = true;
  private storeSubscription!: Subscription;

  constructor(private authService: AuthService, private errorService: ErrorService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('auth').subscribe(state => {
      this.isLoading = state.loading;
      if (state.authError) {
        this.errorService.display(ErrorComponent, { message: 'Invalid input.', isSuccess: false });
      }
    });
  }

  toggleAuth() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    // this.isLoading = true;
    if (form.invalid) {
      // this.isLoading = false;
      this.errorService.display(ErrorComponent, { message: 'Invalid input.', isSuccess: false });
      return;
    }
    if (this.loginMode) {
      this.store.dispatch(
        AuthActions.loginStart({
          email: form.value.email,
          password: form.value.password
        })
      );
      // this.authService.login(form.value.email, form.value.password);
    } else {
      if (form.value.password !== form.value.password_confirmation) {
        // this.isLoading = false;
        this.errorService.display(ErrorComponent, { message: 'Passwords do not match.', isSuccess: false });
        return;
      }
      this.store.dispatch(
        AuthActions.signupStart({
          email: form.value.email,
          password: form.value.password,
          passwordConfirmation: form.value.password_confirmation
        })
      );
      // this.authService.signup(form.value.email, form.value.password, form.value.password_confirmation);
      // this.isLoading = false;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
