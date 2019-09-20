import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { ModalService } from '../services/modal.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

    // I need to use the injector because the ErrorHandler is created before the providers.
    constructor(private _injector: Injector) { }
    handleError(error: Error | HttpErrorResponse) {
        // I do not need to handler server errors here, they are already being handler by interceptor.
        if (error && !(error instanceof HttpErrorResponse)) {
            const modalService = this._injector.get(ModalService);
            modalService.openErrorModal(null, error.name, error.message);
        }
        // I log the error anyway
        console.log(error);
    }
}