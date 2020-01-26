import { Sequelize } from 'sequelize-typescript';
import { Options } from 'sequelize';
import { environment } from 'src/environments/environment';
import { Users } from '../user/models/users';
import { UserProfile } from '../user/models/user-profile';
const usersList = require('../../../test/MOCK_USERS');
const userProfilesList = require('../../../test/MOCK_USERS_PROFILES');

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const { database, username, password, options} = environment.db;
      const sequelize = new Sequelize(database, username, password, options as Options);
      sequelize.addModels([Users, UserProfile]);
      await sequelize.sync({force: true}).then(() => {
        //ONLY FOR TEST REASON
        for (let user of usersList) {
          Users.upsert<Users>(user);
        }
        for (let profile of userProfilesList) {
          UserProfile.upsert<UserProfile>(profile);
        }
      });
      return sequelize;
    }
  }
];
