import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '../../service/config/config.servce';
import * as environment from '../../environments/environment';
import { Users } from '../user/models/users';
import { UserProfile } from '../user/models/user-profile';
import { Groups } from '../group/models/groups';
import { UserGroups } from '../group/models/user-groups';
import * as mockData from '../../../test/MOCK_USERS';
@Module({
  providers: [ConfigService],
})
export class DatabaseModule {
  private env_mode = (process.env.NODE_ENV || '').toLowerCase();
  private env: any;
  constructor(private configService: ConfigService) {
    this.env = environment[this.env_mode] || environment['dev'];
    this.init();
  }

  async init() {
    const sequelize = this.getSequelizeConnection();
    sequelize.addModels([
      Users, UserProfile,
      Groups, UserGroups
    ]);
    
    await sequelize.sync({force: true}).then(() => {
      //ONLY FOR TEST REASON
      for (let user of mockData.users) {
        Users.upsert<Users>(user);
      }

      for (let profile of mockData.profiles) {
        UserProfile.upsert<UserProfile>(profile);
      }
      console.info('SEQUELIZE WAS CONNECTED');
    }).catch(e => {
      console.error(e);
    });
    return sequelize;
  }

  private getSequelizeConnection(): Sequelize  {
    const database = this.configService.config.db_name;
    const username = this.configService.config.db_user;
    const password = this.configService.config.db_pass;
    const host = this.configService.config.db_host;
    const port = this.configService.config.db_port;
    const options = this.env.db.options;

    switch(this.env_mode.toLowerCase()) {
      case 'production':
        return new Sequelize(`postgres://${username}:${password}@${host}:${port}/${database}`, options);
      default:
        return new Sequelize(database, username, password, options);
    }
  }
}
