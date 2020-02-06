import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GroupController } from './group.controller';
import { GroupService } from './services/group.service';
import { GroupDataMapper } from './data-access/groupDataMapper';
import { groupsProviders } from './providers/groups.provider';
import { IdGeneratorMiddleware } from '../user/middlewares/id-generator.middleware';
import { usersProviders } from '../user/providers/users.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [
    GroupDataMapper, 
    ...groupsProviders,
    ...usersProviders,
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
