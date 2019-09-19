import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    PagesRoutingModule,
    SharedModule
  ],
  providers: []
})
export class PagesModule { }
