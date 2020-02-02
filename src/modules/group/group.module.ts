import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GroupController } from './group.controller';
import { GroupService } from './services/group.service';
import { GroupDataMapper } from './data-access/groupDataMapper';
import { groupsProviders } from './providers/groups.provider';
import { IdGeneratorMiddleware } from '../user/middlewares/id-generator.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [
    GroupDataMapper, 
    ...groupsProviders,
    GroupService
  ]
})
export class GroupModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(IdGeneratorMiddleware)
    .forRoutes({ path: 'group', method: RequestMethod.POST });
  }
}
