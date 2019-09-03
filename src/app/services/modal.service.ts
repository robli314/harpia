import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalAlertData } from '../models/modal-alert.model';
import { ModalAlertComponent } from '../shared/modal-alert/modal-alert.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    public isDialogOpen: Boolean = false;

    constructor(public dialog: MatDialog) { }

    openModal(data: ModalAlertData): any {
        if (this.isDialogOpen) {
            return false;
        }

        this.isDialogOpen = true;

        const dialogRef = this.dialog.open(ModalAlertComponent, {
            width: '300px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            this.isDialogOpen = false;
        });
    }
}