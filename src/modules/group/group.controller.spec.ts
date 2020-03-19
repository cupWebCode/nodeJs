import { Test } from "@nestjs/testing";
import * as winston from 'winston';
import { WinstonModule } from "nest-winston";
import { GroupController } from "./group.controller";
import { LoggerService } from "../../service/logger/logger.service";
import { GroupDataMapper } from "./data-access/groupDataMapper";
import { groupsProviders } from "./providers/groups.provider";
import { GroupService } from "./services/group.service";
import { usersProviders } from "../user/providers/users.provider";

describe('GroupController', () => {
  let groupController: GroupController;
  let groupService: GroupService;
  let loggerService: LoggerService;
  
  const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

  let group;
  let userDto;

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
      controllers: [GroupController],
      providers: [
        GroupDataMapper, 
      ...groupsProviders,
      ...usersProviders,
      GroupService,
      LoggerService
      ],
    }).compile();

    groupController = moduleRef.get<GroupController>(GroupController);
    groupService = moduleRef.get<GroupService>(GroupService);
    loggerService = moduleRef.get<LoggerService>(LoggerService);
    group = {
      group_id: "540b4520-491f-11ea-8657-b303b6508f52",
      name: "SOME GROUP",
      permissions: [],
    };
    userDto = {
      country: "Poland",
      email: "John@pl",
      id: "08ceb9b0-6a13-11ea-a66f-7b2787e51926",
      mobilePhone: "+485641265",
      password: "132456789asdfAASD--1235656__ddd",
      userName: "John"
    };
  });

  it('Should create group', async () => {    
    const spy = jest.spyOn(groupService, 'createGroup').mockImplementation();
    await groupService.createGroup(group);
    expect(spy).toHaveBeenCalled();
  });

  it('Should add users to group', async () => {
    const spy = jest.spyOn(groupService, 'assignUserTogroup').mockImplementation();
    delete group.permissions;
    const payload = {
      ...group,
      ...userDto
    };
    await groupService.assignUserTogroup(payload);
    expect(spy).toHaveBeenCalled();
  });
});
