import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { HookDirective } from './shared/directives/hook.directive';
import { ErrorService } from './shared/services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(HookDirective, { static: false}) errorHost!: HookDirective;

  constructor(private store: Store<fromApp.AppState>, private errorService: ErrorService) { }

  ngAfterViewInit() {
    this.errorService.setHook(this.errorHost);
    setTimeout(() => this.store.dispatch(AuthActions.autoLogin()));
  }
}
