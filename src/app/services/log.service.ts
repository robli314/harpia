import { Injectable } from "@angular/core";
import { LogEntryHelper, LogLevel } from '../helpers/log-entry.helper';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    logLevel: LogLevel = LogLevel.All;
    includeDateTime: boolean = true;

    debug(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Debug,
            optionalParams);
    }

    info(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Info,
            optionalParams);
    }

    warn(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Warn,
            optionalParams);
    }

    error(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Error,
            optionalParams);
    }

    fatal(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Fatal,
            optionalParams);
    }

    log(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.All,
            optionalParams);
    }

    private shouldLog(logLevel: LogLevel): boolean {
        return (logLevel >= this.logLevel &&
            logLevel !== LogLevel.Off) ||
            this.logLevel === LogLevel.All;
    }

    private writeToLog(msg: string,
        level: LogLevel,
        params: any[]) {
        if (this.shouldLog(level)) {
            let entry: LogEntryHelper = new LogEntryHelper();
            entry.message = msg;
            entry.level = level;
            entry.extraInfo = params;
            entry.includeDateTime = this.includeDateTime;
            console.log(entry.buildLogString());
        }
    }
}