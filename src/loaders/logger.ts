import winston from 'winston';
import { Service } from 'typedi';
import { environment } from '../config/environment';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';

@Service()
export class Logger {
  instance: winston.Logger;
  private transports: ConsoleTransportInstance[] = [];

  constructor() {
    this.init();
  }

  init() {
    if (environment.NODE_ENV !== 'development') {
      this.transports.push(
        new winston.transports.Console()
      )
    } else {
      this.transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
          )
        })
      )
    }

    this.instance = winston.createLogger({
      level: environment.logs.level,
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      transports: this.transports
    })

    this.instance.info('Logger has been initialized.')
  }
}
