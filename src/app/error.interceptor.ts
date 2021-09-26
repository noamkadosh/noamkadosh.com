import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { ErrorComponent } from "./shared/components/error/error.component";
import { ErrorService } from "./shared/services/error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private errorService: ErrorService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknown error occured.';
                if (error.error.message) {
                    errorMessage = error.error.message;
                }
                this.errorService.display(ErrorComponent, { message: errorMessage, isSuccess: false });
                return throwError(error);
            }
        ));
    }
} 