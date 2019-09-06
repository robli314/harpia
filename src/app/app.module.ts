import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CustomErrorClientHandler } from './helpers/custom-error-client-handler';
import { HttpConfigInterceptor } from './interceptors/http-config.interceptor';
import { ModalAlertComponent } from './shared/components/modal-alert/modal-alert.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    ModalAlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  },
  {
    provide: ErrorHandler,
    useClass: CustomErrorClientHandler
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
