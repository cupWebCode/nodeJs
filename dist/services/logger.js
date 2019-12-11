"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const logHandler = (e) => {
    console.log(`======== Error has occurred ======== \ncode - ${e.code} \nmessage - ${e.message} \n====================================`);
};
class ErrorLogger extends events_1.default {
    constructor() {
        super();
    }
    log(eventName, error) {
        this.emit(eventName, error);
    }
    subscribe(eventName) {
        if (this.listenerCount(eventName) < this.getMaxListeners()) {
            this.on(eventName, logHandler);
            return;
        }
        console.warn('EXCEEDED MAXIMUM LISTENER COUNT');
    }
}
exports.ErrorLogger = ErrorLogger;
//# sourceMappingURL=logger.js.map