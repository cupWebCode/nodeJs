import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { TempStorageService } from './services/temp-storage.service';
import { IdGeneratorMiddleware } from './middlewares/id-generator.middleware';

@Module({
  controllers: [UserController],
  providers: [TempStorageService]
})
export class UserModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IdGeneratorMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
