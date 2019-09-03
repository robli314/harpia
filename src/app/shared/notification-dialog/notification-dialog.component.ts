import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent {
  title = 'Angular-Interceptor';
  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<NotificationDialogComponent>) { }

  onClose(): void {
    this.dialogRef.close('Pizza!');
  }

  /**
   * It return the dialog content class based on the dialog type.
   *
   * @returns {string}
   * @memberof NotificationDialogComponent
   */
  getContentClass(): string {
    switch (this.data['type']) {
      case 'error':
        return 'content-error';
      default:
        return '';
    }
  }
}