"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as tasks from './tasks/index';
const express_1 = __importDefault(require("express"));
const typedi_1 = require("typedi");
const environment_1 = require("./config/environment");
const loaders_1 = require("./loaders");
const logger_1 = require("./loaders/logger");
// const argv: string[] = process.argv;
// const taskName: string = argv[2] || '';
// if (tasks.hasOwnProperty(taskName)) {
//   new tasks[taskName]();
// }
class Server {
    constructor() {
        this.app = express_1.default();
        this.logger = typedi_1.Container.get(logger_1.Logger);
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new loaders_1.Loaders(this.app).init();
                this.app.listen(environment_1.environment.port, err => {
                    if (err) {
                        this.logger.instance.error(err);
                        process.exit(1);
                        return;
                    }
                    this.logger.instance.info(`################################################
          Server listening on port: ${environment_1.environment.port}
         ################################################`);
                });
            }
            catch (e) {
                this.logger.instance.error(e);
            }
        });
    }
}
new Server();
//# sourceMappingURL=app.js.map