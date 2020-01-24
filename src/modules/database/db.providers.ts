import { Sequelize } from 'sequelize-typescript';
import { Options } from 'sequelize';
import { environment } from 'src/environments/environment';
import { Users } from '../user/models/users';
import { UserProfile } from '../user/models/user-profile';
import * as mock_data from '../../../test/MOCK_DATA';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const { database, username, password, options} = environment.db;
      const sequelize = new Sequelize(database, username, password, options as Options);
      sequelize.addModels([Users, UserProfile]);
      await sequelize.sync({force: true}).then(() => {
        //ONLY FOR TEST REASON
        for (let user of mock_data.users) {
          Users.create(user);
        }
        for (let profile of mock_data.userProfiles) {
          UserProfile.create(profile);
        }
      });
      return sequelize;
    }
  }
];
