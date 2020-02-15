import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { Logger } from 'winston';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject('winston') private readonly logger: Logger) {
  }

  async use(req: Request, res: Response, next: NextFunction){
    this.logger.info('MiddlewareConsumer info');
    next();
 }
}
