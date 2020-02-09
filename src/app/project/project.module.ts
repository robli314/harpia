import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ProjectRoutingModule } from "./project-routing.module";
import { ProjectsComponent } from "./projects/projects.component";

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, ProjectRoutingModule, SharedModule]
})
export class ProjectModule {}
