import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NotificationDialogComponent } from '../shared/notification-dialog/notification-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class NotificationMessageService {

    public isDialogOpen: Boolean = false;

    constructor(public dialog: MatDialog) { }

    openDialog(data): any {
        if (this.isDialogOpen) {
            return false;
        }
        this.isDialogOpen = true;

        const dialogRef = this.dialog.open(NotificationDialogComponent, {
            width: '300px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            this.isDialogOpen = false;
        });
    }
}