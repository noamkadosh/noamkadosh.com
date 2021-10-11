import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import { ErrorService } from '../../shared/services/error.service';
import { ErrorComponent } from '../../shared/components/error/error.component';

interface AuthResponse {
  msg: string;
  token: string;
  expiresIn: number;
  _id: string;
  email: string;
}

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap(action =>
        this.http.post<AuthResponse>(environment.API_URL + "/auth/login", {
          email: action.email,
          password: action.password
        })
        .pipe(
          tap(response => {
            this.authService.setLogoutTimer(response.expiresIn);
          }),
          map(response => {
            const now = new Date();
            const expirationDate = new Date(now.getTime() + response.expiresIn);
            const user = new User(response.email, response._id, response.token, expirationDate);
            localStorage.setItem('user', JSON.stringify(user));
            return AuthActions.loginSuccess({
              email: response.email,
              _id: response._id,
              token: response.token,
              expirationDate,
              msg: response.msg,
              redirect: true
            });
          }),
          catchError(error =>
            of(AuthActions.authenticateFail({ error }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(action => {
        action.redirect && this.router.navigate(['/admin']);
        this.errorService.display(ErrorComponent, { message: action.msg, isSuccess: true });
      })
    ), { dispatch: false }
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap(action =>
        this.http.post<AuthResponse>(environment.API_URL + "/auth/signup", {
          email: action.email,
          password: action.password,
          passwordConfirmation: action.passwordConfirmation
        })
        .pipe(
          map(response =>
            AuthActions.signupSuccess({ msg: response.msg })
          ),
          catchError(error =>
            of(AuthActions.authenticateFail({ error: error.error }))
          )
        )
      )
    )
  );

  signupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupSuccess),
      tap(action => {
        this.errorService.display(ErrorComponent, { message: action.msg, isSuccess: true });
      })
    ), { dispatch: false }
  );

  authFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticateFail),
      tap(action => {
        this.errorService.display(ErrorComponent, { message: action.error.error.msg, isSuccess: false });
      })
    ), { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user: {
            email: string,
            _id: string,
            _token: string,
            _tokenExpirationDate: Date
          } = JSON.parse(userData);
          if (!user) {
            return AuthActions.autoLoginFail();
          }

          const loadedUser = new User(
            user.email,
            user._id,
            user._token,
            new Date(user._tokenExpirationDate)
          )

          const now = new Date();
          const expiresIn = new Date(user._tokenExpirationDate).getTime() - now.getTime();
          if (expiresIn > 0) {
            console.log('notExpired');
            this.authService.setLogoutTimer(expiresIn);
            if (this.router.url === "/auth") {
              this.router.navigate(['/admin']);
            }
            return AuthActions.loginSuccess({
              email: loadedUser.email,
              _id: loadedUser._id,
              token: loadedUser.token,
              expirationDate: new Date(user._tokenExpirationDate),
              msg: 'Successfully logged in.',
              redirect: true
            });
          } else {
            if (localStorage.getItem('user')) {
              localStorage.removeItem('user');
            }
          }
        }
        return AuthActions.autoLoginFail();
      })
    )
  );

  // autoLoginFail$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.autoLoginFail),
  //     tap(() => {
  //       console.log('Auto login failed.')
  //     })
  //   ), { dispatch: false }
  // );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('user');
        this.router.navigate(['/auth']);
        this.errorService.display(ErrorComponent, { message: "You are now logged out.", isSuccess: true });
      })
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private errorService: ErrorService
  ) {}
}
