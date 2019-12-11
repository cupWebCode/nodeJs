//import * as tasks from './tasks/index';
import express from 'express';
import { Container as di } from 'typedi';
import { ErrorLogger } from '../services/logger.service';

import { environment } from './config/environment';
import { Loaders } from './loaders';
import { Logger } from './loaders/logger';

// const argv: string[] = process.argv;
// const taskName: string = argv[2] || '';

// if (tasks.hasOwnProperty(taskName)) {

//   new tasks[taskName]();
// }

class Server {
  private app: express.Application = express();
  private logger: Logger = di.get(Logger);

  constructor() {
    this.init();
  }

  async init() {
    try {
      await new Loaders(this.app).init();

      this.app.listen(environment.port, err => {

        if (err) {
          this.logger.instance.error(err);
          process.exit(1);
          return;
        }

        this.logger.instance.info(
          `################################################
          Server listening on port: ${environment.port}
         ################################################`
        );
      });
    } catch (e) {
      this.logger.instance.error(e);
      throw e;
    }
  }
}

new Server();
