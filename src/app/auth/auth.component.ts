import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorComponent } from '../shared/components/error/error.component';
import { ErrorService } from '../shared/services/error.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit, OnDestroy  {

  loginMode: boolean = true;
  isLoading: boolean = true;
  private authStatusSub!: Subscription;

  constructor(private authService: AuthService, private errorService: ErrorService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
  }

  toggleAuth() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      this.isLoading = false;
      this.errorService.display(ErrorComponent, { message: 'Invalid input.', isSuccess: false });
      return;
    }
    if (this.loginMode) {
      this.authService.login(form.value.email, form.value.password);
    } else {
      if (form.value.password !== form.value.password_confirmation) {
        this.isLoading = false;
        this.errorService.display(ErrorComponent, { message: 'Passwords do not match.', isSuccess: false });
        return;
      }
      this.authService.signup(form.value.email, form.value.password, form.value.password_confirmation);
      this.isLoading = false;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
