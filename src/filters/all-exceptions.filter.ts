import { Catch, ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Logger } from 'winston';
import { LoggerService } from '../service/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : `Internal Server Error - ${HttpStatus.INTERNAL_SERVER_ERROR}`;

    this.logger.error('', JSON.stringify(status), '');

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}