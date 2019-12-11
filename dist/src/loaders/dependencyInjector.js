"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const logger_1 = require("./logger");
class DependencyInjector {
    constructor() {
        this.init();
    }
    init() {
        typedi_1.Container.set('logger', logger_1.Logger);
        typedi_1.Container.get(logger_1.Logger).instance.info('Logger has been initialized.');
        throw new Error('went wrong');
    }
}
exports.DependencyInjector = DependencyInjector;
//# sourceMappingURL=dependencyInjector.js.map