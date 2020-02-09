import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, ErrorHandler, NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AlertModule } from "./alert/alert.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { CustomErrorHandler } from "./helpers/custom-error-handler";
import { HttpConfigInterceptor } from "./interceptors/http-config.interceptor";
import { HttpErrorHandlerInterceptor } from "./interceptors/http-error-handler.interceptor";
import { LayoutModule } from "./layout/layout.module";
import { ProjectModule } from "./project/project.module";
import { AppConfigService } from "./services/app-config.service";
import { UserService } from "./services/user.service";

export function initializeApp(
  appConfig: AppConfigService,
  userService: UserService
) {
  return () =>
    appConfig.load().then(() => {
      return userService.populate().toPromise();
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    AlertModule,
    ProjectModule,
    LayoutModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AppConfigService, UserService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
