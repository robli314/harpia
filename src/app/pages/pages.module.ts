import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PagesAuthResolver } from './pages-auth.resolver';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    PagesRoutingModule,
    SharedModule
  ],
  providers: [PagesAuthResolver]
})
export class PagesModule { }
