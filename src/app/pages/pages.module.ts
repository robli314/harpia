import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesAuthResolver } from './pages-auth.resolver';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    PagesRoutingModule,
    SharedModule
  ],
  providers: [PagesAuthResolver]
})
export class PagesModule { }
