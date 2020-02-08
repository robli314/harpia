import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth-guard";
import { ProjectsComponent } from "./projects/projects.component";
const routes: Routes = [
  {
    path: "",
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
