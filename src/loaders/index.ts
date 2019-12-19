import { Application } from "express";
import { Container } from "typedi";
import { Logger } from "./logger";
import { ExpressLoader } from "./express.loader";

export class Loaders {
  private logger: Logger = Container.get(Logger);

  constructor(private expressApp: Application) {}

  init() {
    try {
      new ExpressLoader(this.expressApp);
      this.logger.info("LOADERS - HAVE BEEN INITIALIZED.");
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
