import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesAuthResolver } from './pages-auth.resolver';

const routes: Routes = [{
    path: '',
    component: DashboardComponent,
    resolve: {
        isAuthenticated: PagesAuthResolver
    },
    children: [
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}