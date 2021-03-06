import { Application } from "express";
import bodyParser from "body-parser";
import { Container } from "typedi";
import { environment } from "../config/environment";
import { Routes } from "../api";
import { Logger } from "./logger";

export class ExpressLoader {
  private logger: Logger = Container.get(Logger);

  constructor(private expressApp: Application) {
    this.init();
  }

  private init() {
    try {
      this.expressApp.use(bodyParser.json());

      this.expressApp.use(environment.api.prefix, new Routes().app);

      this.expressApp.use((req, res, next) => {
        res
          .status(404)
          .send({ message: `Route ${req.url} Not found.` });
      });

      this.logger.info("EXPRESS LOADER - HAS BEEN INITIALIZED.");
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
