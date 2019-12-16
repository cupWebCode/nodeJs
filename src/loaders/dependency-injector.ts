import "reflect-metadata";
import { Container } from "typedi";
import { Application } from "express";
import { Logger } from "./logger";

export class DependencyInjector {
  private logger: Logger;

  constructor(public expressApp: Application) {
    this.init();
  }

  init() {
    Container.set("logger", Logger);
    this.logger = Container.get(Logger);

    Container.set("expressApp", this.expressApp);
  }
  catch(e) {
    this.logger.error(e);
    throw e;
  }
}
