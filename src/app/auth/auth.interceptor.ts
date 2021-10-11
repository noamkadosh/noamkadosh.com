import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import { exhaustMap, take, map } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      return this.store.select('auth')
        .pipe(
          take(1),
          map(state => state.user),
          exhaustMap(user => {
            if (!user) {
              return next.handle(req);
            }
            const request = req.clone({
              headers: req.headers.set("Authorization", "Bearer " + user.token)
            });
            return next.handle(request);
          })
        );
    }
}
