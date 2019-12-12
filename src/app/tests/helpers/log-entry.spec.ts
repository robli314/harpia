import { LogEntry, LogLevel } from "src/app/helpers/log-entry";

describe('LogEntry tests...', () => {
    let logEntry: LogEntry;

    beforeEach(() => {
        logEntry = new LogEntry();
        logEntry.message = "Just a log message..."
    });

    afterEach(() => {
        logEntry = null;
    });

    it("It should have message splited in 3 parts", () => {
        logEntry.includeDateTime = true;
        expect(logEntry.buildLogString().split("-").length === 3).toBeTruthy();
    });

    it("It should have message splited in 2 parts", () => {
        logEntry.includeDateTime = false;
        expect(logEntry.buildLogString().split("-").length === 2).toBeTruthy();
    });

    it("It should have a valid date at first part of the message", () => {
        logEntry.includeDateTime = true;
        let dateAsString = logEntry.buildLogString().split("-")[0].trim();
        expect(!isNaN(Date.parse(dateAsString))).toBeTruthy();
    });

    it("It should have log level DEBUG as default", () => {
        expect(logEntry.logLevel === LogLevel.Debug).toBeTruthy();
    });

    it("It should have correct log message set as output", () => {
        logEntry.includeDateTime = true;
        logEntry.message = "Another message...";
        let message = logEntry.buildLogString().split("-")[2];
        expect("Message: Another message..." === message.trim()).toBeTruthy();
    });
})