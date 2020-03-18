import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { GroupModule } from './modules/group/group.module';
import { SharedModule } from './modules/shared/shared.module';
import { LoggerService } from './service/logger/logger.service';

@Module({
  imports: [UserModule, GroupModule, SharedModule],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private loggerService: LoggerService){
    this.init();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)//AuthMiddleware
      .forRoutes({
        path: '*', method: RequestMethod.ALL
      });
  }

  private init() {
    process
      .on('unhandledRejection', (reason: RangeError, promise) => {
        promise.catch(e => {
          this.loggerService.error(`${e.code} ${e.message}`);
          process.exit(1);
        })
      })
      .on('uncaughtException', (err: Error) => {
        this.loggerService.error(err.message);
        process.exit(1);
      });
  }
}
