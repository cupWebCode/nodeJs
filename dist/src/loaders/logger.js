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
const winston_1 = __importDefault(require("winston"));
const typedi_1 = require("typedi");
const environment_1 = require("../config/environment");
let Logger = class Logger {
    constructor() {
        this.transports = [];
        this.init();
    }
    init() {
        if (environment_1.environment.NODE_ENV !== 'development') {
            this.transports.push(new winston_1.default.transports.Console());
        }
        else {
            this.transports.push(new winston_1.default.transports.Console({
                format: winston_1.default.format.combine(winston_1.default.format.cli(), winston_1.default.format.splat())
            }));
        }
        this.instance = winston_1.default.createLogger({
            level: environment_1.environment.logs.level,
            levels: winston_1.default.config.npm.levels,
            format: winston_1.default.format.combine(winston_1.default.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json()),
            transports: this.transports
        });
    }
};
Logger = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map