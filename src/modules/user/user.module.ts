import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { IdGeneratorMiddleware } from './middlewares/id-generator.middleware';
import { UserService } from './services/user.service';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './providers/users.provider';
import { UserDataMapper } from './data-access/UserDataMapper';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserDataMapper, ...usersProviders]
})
export class UserModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IdGeneratorMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
