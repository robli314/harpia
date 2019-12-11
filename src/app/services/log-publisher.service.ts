import { Injectable } from '@angular/core';
import { LogConsole } from '../helpers/log-console';
import { LogPublisher } from '../helpers/log-publisher';

@Injectable({
    providedIn: 'root'
})
export class LogPublisherService {
    private _publishers: LogPublisher[] = [];

    constructor() {
        this.buildPublishers();
    }

    private buildPublishers() {
        let logPublisher: LogPublisher = new LogConsole();
        this._publishers.push(logPublisher);
    }

    get publishers(): LogPublisher[] {
        return Object.assign([], this._publishers);
    }
}