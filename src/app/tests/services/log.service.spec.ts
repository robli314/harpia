import { TestBed } from "@angular/core/testing";
import { LogLevel } from 'src/app/helpers/log-entry';
import { LogService } from "src/app/services/log.service";

describe("LogService tests...", () => {
    beforeEach(() => {
        spyOn(window.console, 'log');

        TestBed.configureTestingModule({
            providers: [LogService]
        });
    });

    function setup() {
        const logService = TestBed.get(LogService);

        return { logService }
    }

    it("It should write INFO messages on console when DEBUG level is set", () => {
        const { logService } = setup();

        logService.logLevel = LogLevel.Debug;

        logService.info("That is a test message...");

        expect(window.console.log).toHaveBeenCalled();
    });

    it("It should not write DEBUG messages on console when INFO level is set", () => {
        const { logService } = setup();

        logService.logLevel = LogLevel.Info;

        logService.debug("That is a test message...");

        expect(window.console.log).not.toHaveBeenCalled();
    });

    it("It should not write ALL messages on console when ALL level is set by default", () => {
        const { logService } = setup();

        logService.warn("That is a test message...");

        expect(window.console.log).toHaveBeenCalled();
    });
});