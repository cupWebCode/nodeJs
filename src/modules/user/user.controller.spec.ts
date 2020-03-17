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

  const credentials = {
    access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODQ0NzE5NjQsImV4cCI6MTU4NDQ3MTk4NH0.Ebkv6yoWsMZthg-cmhyc_GKjOYVF0B53nAbrKruPkAg",
    password:"132456789asdfAASD--1235656__ddd",
    refresh_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODQ0NzE5NjQsImV4cCI6MTU4NDU1ODM2NH0.R7cnFp_2AzoWmPkZCXWp6ol-08V5f6T5EzEFqxnMsZE",
    userName:"John"
  };

  const login = {
    access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODQ0NzE1OTQsImV4cCI6MTU4NDQ3MTYxNH0.QFGNPFyRgeZueXU4RHcGMDZ1UrGFConTVZ7dsQ1vrdY",
    refresh_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODQ0NzE1OTQsImV4cCI6MTU4NDU1Nzk5NH0.eBN9XMqd4uFguuLffRPIvZksJKOBmWLtGJ7iIQeIjJU",
    user_id:"3cfa2dc0-6881-11ea-8bee-530bedc32d41",
    userName:"John"
  };

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
    userService = moduleRef.get<UserService>(UserService);
  });


  it('Should return all registered users', async () => {
    jest.spyOn(userService, 'getUser').mockImplementation(() => usersList);
    const res = (await userService.getUser()).length;
    expect(res).toBe(usersList.length);
  });

  it('Should return all registered users', async () => {
    jest.spyOn(userService, 'loginUser').mockImplementation(() => Promise.resolve(login));
    const res = (await userService.loginUser(credentials));
    expect(res).toEqual(login);
  });

});
