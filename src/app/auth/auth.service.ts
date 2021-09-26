import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorComponent } from '../shared/components/error/error.component';
import { ErrorService } from '../shared/services/error.service';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth: boolean = false;
  private token!: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private errorService: ErrorService) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getAuthStatusListener() {
    return this.authStatusListener;
  }

  signup(email: string, password: string, passwordConfirmation: string) {
    const authData: AuthData = {
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    };
    this.http.post<{ message: string }>(environment.API_URL + "/auth/signup", authData)
    .subscribe(response => {
      console.log(response);
      this.errorService.display(ErrorComponent, { message: response.message, isSuccess: true });
    },
    error => {
      this.authStatusListener.next(false);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post<{ message: string, token: string, expiresIn: number }>(environment.API_URL + "/auth/login", authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresIn = response.expiresIn * 1000;
        this.setTimer(expiresIn);
        this.isAuth = true;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresIn)
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/admin']);
        this.errorService.display(ErrorComponent, { message: response.message, isSuccess: true });
      }
    },
    error => {
      this.authStatusListener.next(false);
    });
  }

  autoLogin() {
    const authData = this.getAuthDate();
    if (!authData) {
      this.isAuth = false;
      return;
    }
    const now = new Date();
    const expiresIn = authData.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authData.token;
      this.isAuth = true;
      this.setTimer(expiresIn);
      this.errorService.display(ErrorComponent, { message: 'Successfully logged in.', isSuccess: true });
      if (this.router.url === "/auth") {
        this.router.navigate(['/admin']);
      }
    }
  }

  logout() {
    this.token = '';
    this.isAuth = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth']);
    this.errorService.display(ErrorComponent, { message: "You are now logged out.", isSuccess: true });
  }

  private setTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthDate() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return;
    }
    return {
      token: token,
      expiration: new Date(expiration)
    };
  }
}
