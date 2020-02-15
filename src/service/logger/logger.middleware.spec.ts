import { Test, TestingModule } from '@nestjs/testing';
import { LoggerMiddleware } from './logger.middleware';

describe('LoggerMiddleware', () => {
  let service: LoggerMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerMiddleware],
    }).compile();

    service = module.get<LoggerMiddleware>(LoggerMiddleware);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
