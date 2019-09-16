import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DefaultComponent } from './default/default.component';

@NgModule({
  declarations: [DefaultComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [DefaultComponent]
})
export class LayoutModule { }
