export enum AlertType { INFO, WARNING, ERROR }

export class ModalAlertData {
    title: string;
    status: number;
    name: string;
    message: string;
    alertType: AlertType;
    closeButtonLabel: string;
    constructor(data?) {
        if (data) {
            this.title = data.title;
            this.status = data.status;
            this.name = data.name;
            this.message = data.message;
            this.alertType = data.alertType;
            this.closeButtonLabel = data.closeButtonLabel;
        }
    }
}