import { Users } from '../models/users';
import { UserProfile } from '../models/user-profile';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users
  },
  {
    provide: 'USER-PROFILE_REPOSITORY',
    useValue: UserProfile
  }
];
