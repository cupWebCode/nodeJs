import { Controller, Inject, Post, Get, Put, Delete, Body, Headers, Res, HttpStatus, UsePipes, HttpException } from '@nestjs/common';
import { Logger } from 'winston';
import { Response } from 'express';

import { SchemaUserBuilder } from '../../validation/schema-builder/schema-user-builder';
import { UserDto } from './dto/user.dto';
import { RequestValidatorPipe } from 'src/pipes/request-validator.pipe';
import { ResponseApiSuccess } from 'src/common/response-api';
import { UserService } from './services/user.service';
import { Users } from './models/users';

const createUserSchema = new SchemaUserBuilder().createUser<Body>().options({
  abortEarly: false,
  allowUnknown: true
});
//07-41 - debug
//13-15 - winston

@Controller('user')
export class UserController {
  constructor(public userService: UserService,
    @Inject('winston') private readonly logger: Logger
    ) {}
  
  @Post()
  @UsePipes(new RequestValidatorPipe<UserDto>(createUserSchema))
  async createUser(@Res() response: Response, @Body() userDto: UserDto) {
    try {
      this.logger.info(JSON.stringify({
        methodName: 'createUser',
        arguments: userDto
      }))
      const result = await this.userService.createUser(userDto);
      
      response
        .json(new ResponseApiSuccess<any>(true, null, `User ${result.userName} was created successfully.`))
        .status(HttpStatus.CREATED);
    } catch (e) {
      this.logger.error(JSON.stringify({
        methodName: 'POST',
        arguments: userDto,
        message: e.stack
      }))
    }
  }

  @Get()
  async getUser(@Headers() headers: Partial<UserDto>, @Res() response: Response) {
    try {
      this.logger.info(JSON.stringify({
        methodName: 'getUser',
        arguments: headers.id
      }))
      const result = await this.userService.getUser(headers.id as string);
      if (result.length) {
        const user = result[0];
        return response.json(new ResponseApiSuccess<Users>(true, user, null))
          .status(HttpStatus.OK);
      }
      response
        .json({ message: "User was't found." })
        .status(HttpStatus.NO_CONTENT);

    } catch (e) {
      this.logger.error(JSON.stringify({
        methodName: 'GET',
        arguments: headers.id,
        message: e.stack
      }))
    }
  }

  @Put(':edit')
  async editUser(@Body() userDto: UserDto, @Res() response: Response) {
    try {
      this.logger.info(JSON.stringify({
        methodName: 'editUser',
        arguments: userDto
      }))

      const result = await this.userService.editUser(userDto);
    
      if (result.length && result[0]) {
        return response
          .json(new ResponseApiSuccess<any>(true, null, `User ${userDto.userName} was updated successfully.`))
          .status(HttpStatus.OK);
      }
      response
        .json({ message: "User was't found." })
        .status(HttpStatus.NO_CONTENT);
    } catch (e) {
      this.logger.error(JSON.stringify({
        methodName: 'PUT',
        arguments: userDto,
        message: e.stack
      }))
    }
  }

  @Delete(':delete')
  async deleteUser(@Headers() headers: Partial<UserDto>, @Res() response: Response) {
    try {
      this.logger.info(JSON.stringify({
        methodName: 'deleteUser',
        arguments: headers.id
      }))

      const result = await this.userService.deleteUser(headers.id);
   
      if (result) {
        return response
          .json(new ResponseApiSuccess<any>(true, null, `User was deleted successfully.`))
          .status(HttpStatus.OK);
        }
        response
          .json({ message: "User was't found." })
          .status(HttpStatus.NO_CONTENT);
    } catch (e) {
      this.logger.error(JSON.stringify({
        methodName: 'DELETE',
        arguments: headers.id,
        message: e.stack
      }))
    }
  }
}
