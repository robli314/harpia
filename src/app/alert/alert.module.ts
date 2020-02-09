import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ModalAlertComponent } from "./modal-alert/modal-alert.component";

@NgModule({
  declarations: [ModalAlertComponent],
  imports: [SharedModule]
})
export class AlertModule {}
