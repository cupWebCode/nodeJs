import { Users } from '../models/users';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users
  },
];
