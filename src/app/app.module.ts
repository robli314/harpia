import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from './alert/alert.module';
import { ModalAlertComponent } from './alert/modal-alert/modal-alert.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CustomErrorHandler } from './helpers/custom-error-handler';
import { HttpConfigInterceptor } from './interceptors/http-config.interceptor';
import { HttpErrorHandlerInterceptor } from './interceptors/http-error-handler.interceptor';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { AppConfigService } from './services/app-config.service';
import { UserService } from './services/user.service';

export function initializeApp(appConfig: AppConfigService, userService: UserService) {
  return () => appConfig.load().then(() => {
    userService.populate();
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    ModalAlertComponent /* The MatDialog instantiates components at runtime, 
    so the Angular compiler needs extra information, in order to create the 
    necessary ComponentyFactory for the dialog content. Therefore, we must 
    include the component class in the list of entryComponents, so the 
    Angular compiler knows how to create the ComponentFactory for it. */
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    AlertModule,
    PagesModule,
    LayoutModule,
    MatSnackBarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }, AppConfigService,
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
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

