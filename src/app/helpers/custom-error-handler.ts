import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { ModalService } from '../services/modal.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

    // I need to use the injector because the ErrorHandler is created before the providers.
    constructor(private injector: Injector) { }
    handleError(error: Error | HttpErrorResponse) {
        const modalService = this.injector.get(ModalService);
        modalService.openErrorModal(null, error.name, error.message);
        // I log the error anyway
        console.error(error);
    }
}