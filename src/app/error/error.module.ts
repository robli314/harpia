import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    SharedModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
