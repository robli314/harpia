import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { LogService } from "../services/log.service";
import { ModalService } from "../services/modal.service";

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private _modalService: ModalService,
    private _logService: LogService
  ) {}

  /**
   * The interceptor to handler all HttpErrorResponse.
   *
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof TokenInterceptor
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._logService.debug("event--->>>", event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let message = "";

        error.error.message instanceof Object
          ? (message = error.error.message.errmsg)
          : (message = error.error.message);

        switch (error.status) {
          case 0:
            message = "Server cannot be reached.";
            break;
        }

        this._modalService.openErrorModal(error.status, error.name, message);

        return throwError(error);
      })
    );
  }
}
