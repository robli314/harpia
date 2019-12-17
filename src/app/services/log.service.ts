import { Injectable } from "@angular/core";
import { LogEntry, LogLevel } from '../helpers/log-entry';
import { LogPublisherService } from './log-publisher.service';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    logLevel: LogLevel = LogLevel.All;
    includeDateTime: boolean = true;

    constructor(private logPublisherService: LogPublisherService) {
    }

    debug(msg: string, ...optionalParameters: any[]) {
        this.writeToLog(msg, LogLevel.Debug,
            optionalParameters);
    }

    info(msg: string, ...optionalParameters: any[]) {
        this.writeToLog(msg, LogLevel.Info,
            optionalParameters);
    }

    warn(msg: string, ...optionalParameters: any[]) {
        this.writeToLog(msg, LogLevel.Warn,
            optionalParameters);
    }

    error(msg: string, ...optionalParameters: any[]) {
        this.writeToLog(msg, LogLevel.Error,
            optionalParameters);
    }

    fatal(msg: string, ...optionalParameters: any[]) {
        this.writeToLog(msg, LogLevel.Fatal,
            optionalParameters);
    }

    log(msg: string, ...optionalParameters: any[]) {
        this.writeToLog(msg, LogLevel.All,
            optionalParameters);
    }

    private shouldLog(logLevel: LogLevel): boolean {
        return (logLevel >= this.logLevel &&
            logLevel !== LogLevel.Off) ||
            this.logLevel === LogLevel.All;
    }

    private writeToLog(msg: string,
        logLevel: LogLevel,
        parameters: any[]) {
        if (this.shouldLog(logLevel)) {
            let entry: LogEntry = new LogEntry();
            entry.message = msg;
            entry.logLevel = logLevel;
            entry.extraInfo = parameters;
            entry.includeDateTime = this.includeDateTime;
            this.logPublisherService.publishers.forEach(publisher => {
                publisher.log(entry).subscribe();
            });
        }
    }
}