import { Sequelize } from 'sequelize-typescript';
import { Options } from 'sequelize';
import { environment } from 'src/environments/environment';
import { Users } from '../user/models/users';
import { UserProfile } from '../user/models/user-profile';
import { Groups } from '../group/models/groups';
import { UserGroups } from '../group/models/user-groups';
const usersList = require('../../../test/MOCK_USERS');
const userProfilesList = require('../../../test/MOCK_USERS_PROFILES');
const groupsList = require('../../../test/MOCK_GROUPS');
const groupUsersList = require('../../../test/MOCK_USER_GROUPS');

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const { database, username, password, options} = environment.db;
      const sequelize = new Sequelize(database, username, password, options as Options);
      sequelize.addModels([
        Users, UserProfile,
        Groups, UserGroups
      ]);

      await sequelize.sync({force: true}).then(() => {
        //ONLY FOR TEST REASON
        for (let group of groupsList) {
          Groups.upsert<Groups>(group);
        }

        for (let user of usersList) {
          Users.upsert<Users>(user);
        }

        for (let groupUser of groupUsersList) {
          UserGroups.upsert<UserGroups>(groupUser);
        }

        // for (let profile of userProfilesList) {
        //   UserProfile.upsert<UserProfile>(profile);
        // }
      });
      return sequelize;
    }
  }
];
