import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { GroupModule } from './modules/group/group.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [UserModule, GroupModule, SharedModule],
  controllers: [],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)//AuthMiddleware
      .forRoutes({
        path: '*', method: RequestMethod.ALL
      });
  }
}
