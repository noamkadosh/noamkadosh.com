import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { AppRoutesModule } from "./routes/routes";
import { SharedModule } from "./shared/shared.module";
import { PageNotFoundComponent } from "./pagenotfound/pagenotfound.component";
import { DesignComponent } from "./design/design.component";
import { AdminModule } from "./admin/admin.module";
import { AuthComponent } from "./auth/auth.component";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { HomeModule } from "./home/home.module";
import { ErrorInterceptor } from "./error.interceptor";
import { ErrorComponent } from "./shared/components/error/error.component";
import { StoreModule } from "@ngrx/store";
import { appReducer } from "./store/app.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth/store/auth.effects";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DesignComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),
    AppRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminModule,
    HomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
