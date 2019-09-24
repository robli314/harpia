import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from "@angular/core";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

    // I need to use the injector because the ErrorHandler is created before the providers.
    constructor(private _injector: Injector) { }
    handleError(error: Error | HttpErrorResponse) {
        console.log(error);
    }
}