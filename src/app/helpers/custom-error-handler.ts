import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { LogService } from "../services/log.service";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  // I need to use the injector because the ErrorHandler is created before the providers.
  constructor(private _injector: Injector) {}
  handleError(error: Error | HttpErrorResponse) {
    this._injector.get(LogService).error("Something went wrong!", error);
  }
}
