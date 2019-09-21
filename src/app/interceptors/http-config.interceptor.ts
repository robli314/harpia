import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private _modalService: ModalService) { }

    /**
     * The JWT token is retrieved from the localStorage, in case there is one valid token, then token is 
     * inserted in the request headers.
     * 
     * The Content-Type and Accept are set to 'application/json'.
     *
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     * @memberof TokenInterceptor
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('jwtToken');

        // set authorization token
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', token) });
        }

        // set Content-Type
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        // set Accept
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let message = '';

                error.error.message instanceof Object ?
                    message = error.error.message.errmsg :
                    message = error.error.message;

                switch (error.status) {
                    case 0:
                        message = 'Server cannot be reached.';
                        break;
                    default:
                        message = 'Sorry! Something went wrong.'
                }

                this._modalService.openErrorModal(error.status, error.name, message);

                return throwError(error);
            }));
    }
}

