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
  data: {
    login: {
      email: string;
      _id: string;
      token: string;
      expiresIn: number;
    },
    signup: {
      email: string;
      _id: string;
    }
  }
}

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap(action =>
        // Rest API
        // this.http.post<AuthResponse>(environment.API_URL + "/auth/login", {
        //   email: action.email,
        //   password: action.password
        // })

        // GraphQL
        this.http.post<AuthResponse>(environment.GRAPHQL_URL, {
          query: `
            query {
              login(userInput: {
                email: "${ action.email }",
                password: "${ action.password }"
              }) {
                email
                _id
                token
                expiresIn
              }
            }
          `
        })
        .pipe(
          tap(response => {
            this.authService.setLogoutTimer(response.data.login.expiresIn);
          }),
          map(response => {
            const now = new Date();
            const expirationDate = new Date(now.getTime() + response.data.login.expiresIn);
            const user = new User(response.data.login.email, response.data.login._id, response.data.login.token, expirationDate);
            localStorage.setItem('user', JSON.stringify(user));
            return AuthActions.loginSuccess({
              email: response.data.login.email,
              _id: response.data.login._id,
              token: response.data.login.token,
              expirationDate
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
        this.router.navigate(['/admin']);
        this.errorService.display(ErrorComponent, { message: 'Successfully logged in.', isSuccess: true });
      })
    ), { dispatch: false }
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap(action =>
        // Rest API
        // this.http.post<AuthResponse>(environment.API_URL + "/auth/signup", {
        //   email: action.email,
        //   password: action.password,
        //   passwordConfirmation: action.passwordConfirmation
        // })

        // GraphQL
        this.http.post<AuthResponse>(environment.GRAPHQL_URL, {
          query: `
            mutation {
              signup(userInput: {
                email: "${ action.email }",
                password: "${ action.password }",
                passwordConfirmation: "${ action.passwordConfirmation }"
              }) {
                _id
              }
            }
          `
        })
        .pipe(
          map(response =>
            AuthActions.signupSuccess()
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
        this.errorService.display(ErrorComponent, { message: 'Signed up successfully.', isSuccess: true });
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
              expirationDate: new Date(user._tokenExpirationDate)
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
