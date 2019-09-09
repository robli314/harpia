import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';

@NgModule({
  declarations: [ModalAlertComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AlertModule { }
