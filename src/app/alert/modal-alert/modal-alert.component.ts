import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AlertType, ModalAlertData } from "src/app/models/modal-alert.model";

@Component({
  templateUrl: "./modal-alert.component.html",
  styleUrls: ["./modal-alert.component.scss"]
})
export class ModalAlertComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalAlertData,
    public dialogRef: MatDialogRef<ModalAlertComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close("");
  }

  /**
   * It returns the modal content class based on the alert type.
   *
   * @param {AlertType} type
   * @returns {string}
   * @memberof ModalAlertComponent
   */
  getContentClass(type: AlertType): string {
    switch (type) {
      case AlertType.ERROR:
        return "content-error";
      default:
        return "";
    }
  }

  /**
   * Gets the icon to be used on the modal based on the alert type.
   *
   * @param {AlertType} type
   * @returns {string}
   * @memberof ModalAlertComponent
   */
  getAlertIcon(type: AlertType): string {
    switch (type) {
      case AlertType.INFO:
        return "info";
      case AlertType.WARNING:
        return "warning";
      case AlertType.ERROR:
        return "error";
    }
  }

  ngOnInit(): void {}
}
