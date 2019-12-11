"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencyInjector_1 = require("./dependencyInjector");
const typedi_1 = require("typedi");
const logger_1 = require("./logger");
class Loaders {
    constructor(expressApp) {
        this.expressApp = expressApp;
        this.logger = typedi_1.Container.get(logger_1.Logger);
        this.init();
    }
    init() {
        try {
            new dependencyInjector_1.DependencyInjector();
        }
        catch (e) {
            this.logger.instance.error(e);
        }
    }
}
exports.Loaders = Loaders;
//# sourceMappingURL=index.js.map