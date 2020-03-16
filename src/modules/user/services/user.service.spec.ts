import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserDataMapper } from '../data-access/userDataMapper';
import { Users } from '../models/users';
import { UserProfile } from '../models/user-profile';
import { CryptService } from '../../../service/crypt/crypt.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserDataMapper,
        CryptService,
        {
          provide: 'USERS_REPOSITORY',
          useValue: Users
        },
        {
          provide: 'USER-PROFILE_REPOSITORY',
          useValue: UserProfile
        }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
