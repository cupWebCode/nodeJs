import { Module } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { DatabaseModule } from '../database/database.module';

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
}); 

@Module({
  imports: [
    DatabaseModule, 
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: 'info.log',
          level: 'info',
          format: winston.format.combine(
            winston.format.label({ label: 'NODE_JS APP' }),
            winston.format.timestamp(),
            myFormat
          )
        }),
        new winston.transports.File({ filename: 'errors.log', level: 'error' }),
      ],
    })
  ],
  providers: [],
  exports: []
})
export class SharedModule {}
