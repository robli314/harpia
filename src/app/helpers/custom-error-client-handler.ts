import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { ModalService } from '../services/modal.service';

@Injectable()
export class CustomErrorClientHandler implements ErrorHandler {

    // I need to use the injector because the ErrorHandler is created before the providers.
    constructor(private injector: Injector) { }

    // I do not need to handler server errors here, there are already handler in an interceptor.
    handleError(error: Error | HttpErrorResponse) {
        if (error instanceof Error) {
            const modalService = this.injector.get(ModalService);
            modalService.openErrorModal(null, error.name, error.message);
            // I log the error anyway
            console.error(error);
        }
    }
}