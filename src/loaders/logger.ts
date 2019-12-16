import "reflect-metadata";
import winston from "winston";
import { Service } from "typedi";
import { environment } from "../config/environment";
import { ConsoleTransportInstance } from "winston/lib/winston/transports";

@Service()
export class Logger {
  private winstonLog: winston.Logger;
  private transports: ConsoleTransportInstance[] = [];

  constructor() {
    this.winstonLog = this.init();
  }

  error(e: Error): void {
    this.winstonLog.error(e);
  }

  info(msg: string): void {
    this.winstonLog.info(msg);
  }

  private init(): winston.Logger {
    if (environment.NODE_ENV !== "development") {
      this.transports.push(new winston.transports.Console());
    } else {
      this.transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat()
          )
        })
      );
    }

    return winston.createLogger({
      level: environment.logs.level,
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      transports: this.transports
    });
  }
}
