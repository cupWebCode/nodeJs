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
      this.expressApp.get("/status", (req, res) => {
        res.json({ user: "Status is here" }).status(200);
      });

      this.expressApp.head("/status", (req, res) => {
        res.status(200).end();
      });

      this.expressApp.use(bodyParser.json());

      this.expressApp.use(environment.api.prefix, new Routes().app);

      this.expressApp.use((req, res, next) => {
        const err = new Error("Not Found");
        err["status"] = 404;
        next(err);
      });

      this.logger.info("EXPRESS LOADER - HAS BEEN INITIALIZED.");
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
