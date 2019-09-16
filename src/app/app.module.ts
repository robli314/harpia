import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from './alert/alert.module';
import { ModalAlertComponent } from './alert/modal-alert/modal-alert.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CustomErrorHandler } from './helpers/custom-error-handler';
import { HttpConfigInterceptor } from './interceptors/http-config.interceptor';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';

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
    LayoutModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  },
  {
    provide: ErrorHandler,
    useClass: CustomErrorHandler
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
