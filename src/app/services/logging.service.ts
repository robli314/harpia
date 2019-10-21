import { Inject, Injectable } from '@angular/core';
import { JL } from 'jsnlog';

export enum LogLevel {
    All = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
    Off = 6
}


@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    level: LogLevel = LogLevel.All;
    logWithDate: boolean = true;
    JL: JL.JSNLog;

    constructor(@Inject('JSNLOG') JL: JL.JSNLog) {
        this.JL = JL;
    }

    error(message: any) {
        // Send errors to be saved here
        // The console.log is only for testing this example.
        console.log(message);
        this.JL().error(message);
    }
}