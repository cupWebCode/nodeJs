import { Module, NestModule, MiddlewareConsumer, RequestMethod, Inject } from '@nestjs/common';
import { UserController } from './user.controller';
import { IdGeneratorMiddleware } from './middlewares/id-generator.middleware';
import { UserService } from './services/user.service';
import { usersProviders } from './providers/users.provider';
import { UserDataMapper } from './data-access/UserDataMapper';
import { CryptService } from 'src/service/crypt/crypt.service';
import { SharedModule } from '../shared/shared.module';
import { Logger } from 'winston';
import { TokenGeneratorMiddleware } from './middlewares/token-generator.middleware';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [
    UserService, 
    UserDataMapper, 
    ...usersProviders,
    CryptService
  ]
})
export class UserModule implements NestModule {
  constructor(@Inject('winston') private readonly logger: Logger){

  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IdGeneratorMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });

      consumer
      .apply(TokenGeneratorMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
