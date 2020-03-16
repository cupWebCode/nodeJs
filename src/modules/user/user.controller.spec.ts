import { Test } from "@nestjs/testing";
import * as winston from 'winston';
import { WinstonModule } from "nest-winston";

import { UserController } from "./user.controller";
import { UserService } from "./services/user.service";
import { LoggerService } from "../../service/logger/logger.service";
import { UserDataMapper } from "./data-access/userDataMapper";
import { CryptService } from "../../service/crypt/crypt.service";
import { Users } from "./models/users";
import { UserProfile } from "./models/user-profile";

const usersList = require('../../../test/MOCK_USERS');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let loggerService: LoggerService;
  
  const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  }); 

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        WinstonModule.forRoot({
        transports: [
          new winston.transports.File({
            filename: 'info.log',
            level: 'info',
            format: winston.format.combine(
              winston.format.label({ label: 'NODE_JS APP' }),
              winston.format.timestamp(),
              myFormat
            )
          }),
          new winston.transports.File({ filename: 'errors.log', level: 'error' }),
        ],
        })
      ],
      controllers: [UserController],
      providers: [
        UserService,
        UserDataMapper,
        CryptService,
        LoggerService,
        {
          provide: 'USERS_REPOSITORY',
          useValue: Users
        },
        {
          provide: 'USER-PROFILE_REPOSITORY',
          useValue: UserProfile
        }],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
  });


  it('should return an array of users', async () => {
    const result = usersList;
    jest.spyOn(userService, 'getUser').mockImplementation(() => result);

    const res = (await userService.getUser()).length;
    expect(res).toBe(result.length);
  });
});
