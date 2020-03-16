import express, { Application } from "express";
import { Container } from "typedi";
import { environment } from "./config/environment";
import { Loaders } from "./loaders";
import { Logger } from "./loaders/logger";

class Server {
  private app: Application = express();
  private logger: Logger = Container.get(Logger);

  constructor() {
    this.init();
  }

  init() {
    try {
      new Loaders(this.app).init();
      this.app.disable("x-powered-by");
      this.app.listen(environment.port, err => {
        if (err) {
          this.logger.error(err);
          process.exit(1);
        }

        this.logger.info(
          `################################################
            Server listening on port: ${environment.port}
          ################################################`
        );
      });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}

new Server();
