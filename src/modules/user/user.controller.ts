import { Controller, Post, Req, Body, Headers, Get, Res, HttpStatus, UsePipes, Param } from '@nestjs/common';
import { Request, Response } from 'express';

import { SchemaUserBuilder } from '../../validation/schema-builder/schema-user-builder';
import { TempStorageService } from './services/temp-storage.service';
import { UserDto, UserIdDto } from './dto/user.dto';
import { RequestValidatorPipe } from 'src/pipes/request-validator.pipe';
import { ResponseApiSuccess } from 'src/common/response-api';
import { User } from './interfaces/user';

const createUserSchema = new SchemaUserBuilder().createUser<Body>().options({
  abortEarly: false,
  allowUnknown: true
});

@Controller('user')
export class UserController {
  constructor(public storage: TempStorageService) {}
  //CREATE user
  @Post()
  @UsePipes(new RequestValidatorPipe<UserDto>(createUserSchema))
  createUser(@Res() res: Response, @Body() userDto: UserDto): void {
    this.storage.addUser(userDto);
    res.status(HttpStatus.OK).json(new ResponseApiSuccess<any>(true, { userName: userDto.userName }));
  }

  @Get()
  getUser(@Headers() headers: UserIdDto, @Res() res: Response, @Body() userDto: UserDto): void {
    const userId = headers.id;
    const user: User = this.storage.getUser(userId);
    res.status(HttpStatus.OK).json({ user });
  }

}
