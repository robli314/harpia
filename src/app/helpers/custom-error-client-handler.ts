import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Router } from '@angular/router';

@Injectable()
export class CustomErrorClientHandler implements ErrorHandler {

    // I need to use the injector because the ErrorHandler is created before the providers.
    constructor(private injector: Injector) { }

    // I do not need to handler server errors here, there are already handler in the interceptor.
    handleError(error: Error | HttpErrorResponse) {
        if (error instanceof Error) {
            const router = this.injector.get(Router);
            router.navigate(['/error'], { queryParams: { error: error } });
            console.error(error);
        }
    }
}