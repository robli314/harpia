export enum LogLevel {
    All = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
    Off = 6
}

export class LogEntryHelper {
    entryDate: Date = new Date();
    message: string = "";
    logLevel: LogLevel = LogLevel.Debug;
    extraInfo: any[] = [];
    includeDateTime: boolean = true;

    buildLogString(): string {
        let result: string = "";

        if (this.includeDateTime) {
            result = new Date() + " - ";
        }
        result += "Type: " + LogLevel[this.logLevel];
        result += " - Message: " + this.message;
        if (this.extraInfo.length) {
            result += " - Extra Info: "
                + this.formatParams(this.extraInfo);
        }

        return result;
    }

    private formatParams(parameters: any[]): string {
        let result: string = parameters.join(",");
        if (parameters.some(p => typeof p == "object")) {
            result = "";
            for (let parameter of parameters) {
                result += JSON.stringify(parameter) + ",";
            }
        }
        return result;
    }
}