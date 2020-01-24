import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CorsMiddleware } from './middlewares/cors.middleware';

@Module({
  imports: [UserModule],
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
