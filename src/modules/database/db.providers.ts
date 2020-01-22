import { Sequelize } from 'sequelize-typescript';
import { Options } from 'sequelize';
import { environment } from 'src/environments/environment';
import { Users } from '../user/models/users';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const { database, username, password, options} = environment.db;
      const sequelize = new Sequelize(database, username, password, options as Options);
      sequelize.addModels([Users]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
