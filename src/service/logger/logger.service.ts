import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { Logger } from 'winston';
import { NextFunction } from 'express';

@Injectable()
export class LoggerService {
  constructor(@Inject('winston') private readonly logger: Logger) {

  }

 info(methodName: string, args?: any) {
  this.logger.info(JSON.stringify({
    methodName,
    args
  }));
 }

 error(method: string, args?: any, message?: string) {
  this.logger.error(JSON.stringify({
    method,
    args,
    message
  }))
 }
}
