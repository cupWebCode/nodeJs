"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const typedi_1 = require("typedi");
const logHandler = (err) => {
    process.stdout.write(`======== Error has occurred ======== \ncode - ${err.code} \nmessage - ${err.message} \n====================================`);
};
let ErrorLogger = class ErrorLogger extends events_1.default {
    constructor() {
        super();
    }
    log(eventName, error) {
        this.emit(eventName, error);
    }
    subscribe(eventName) {
        const maxListeners = this.getMaxListeners();
        if (this.listenerCount(eventName) < maxListeners) {
            this.on(eventName, logHandler);
            return;
        }
        process.stdout.write(`EXCEEDED MAXIMUM LISTENER COUNT. MAXIMUM IS ${maxListeners}`);
    }
};
ErrorLogger = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], ErrorLogger);
exports.ErrorLogger = ErrorLogger;
//# sourceMappingURL=logger.service.js.map