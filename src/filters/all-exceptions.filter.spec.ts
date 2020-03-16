import { Test } from '@nestjs/testing';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { LoggerService } from '../service/logger/logger.service';

describe('AllExceptionsFilter', () => {
  let logger: LoggerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [],
        providers: [{
          provide: LoggerService,
          useValue: {}
      }],
      }).compile();

      logger = moduleRef.get<LoggerService>(LoggerService);
  });
   
  it('should be defined', () => {
    expect(new AllExceptionsFilter(logger)).toBeDefined();
  });
});
