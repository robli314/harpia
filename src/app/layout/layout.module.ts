import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DefaultComponent } from "./default/default.component";

@NgModule({
  declarations: [DefaultComponent],
  imports: [SharedModule],
  exports: [DefaultComponent]
})
export class LayoutModule {}
