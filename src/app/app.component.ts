import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { HookDirective } from './shared/directives/hook.directive';
import { ErrorService } from './shared/services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(HookDirective, { static: false}) errorHost!: HookDirective;

  constructor(private authService: AuthService, private errorService: ErrorService) { }

  ngAfterViewInit() {
    this.errorService.setHook(this.errorHost);
    setTimeout(() => this.authService.autoLogin());
  }
}
