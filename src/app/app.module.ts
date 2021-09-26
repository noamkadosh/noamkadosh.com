import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./routes/routes";
import { SharedModule } from "./shared/shared.module";
import { PageNotFoundComponent } from "./pagenotfound/pagenotfound.component";
import { DesignComponent } from "./design/design.component";
import { AdminModule } from "./admin/admin.module";
import { AuthComponent } from "./auth/auth.component";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { HomeModule } from "./home/home.module";
import { ErrorInterceptor } from "./error.interceptor";
import { ErrorComponent } from "./shared/components/error/error.component";

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
    AppRoutingModule,
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
