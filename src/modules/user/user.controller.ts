import { Controller, Post, Get, Put, Delete, Body, Headers, Res, HttpStatus, UsePipes } from '@nestjs/common';
import { Response } from 'express';

import { SchemaUserBuilder } from '../../validation/schema-builder/schema-user-builder';
import { UserDto } from './dto/user.dto';
import { RequestValidatorPipe } from 'src/pipes/request-validator.pipe';
import { ResponseApiSuccess } from 'src/common/response-api';
import { UserService } from './services/user.service';
import { Users } from './models/users';
import { editUserType } from './types';

const createUserSchema = new SchemaUserBuilder().createUser<Body>().options({
  abortEarly: false,
  allowUnknown: true
});

@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}
  
  @Post()
  @UsePipes(new RequestValidatorPipe<UserDto>(createUserSchema))
  async createUser(@Res() response: Response, @Body() userDto: UserDto) {
    try {
      const result = await this.userService.createUser(userDto);
      
      response
        .json(new ResponseApiSuccess<any>(true, null, `User ${result.userName} was created successfully.`))
        .status(HttpStatus.CREATED);
    } catch (e) {
      console.error(e.stack);
    }
  }

  @Get()
  async getUser(@Headers() headers: Partial<UserDto>, @Res() response: Response) {
    try {
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
      console.error(e.stack);
    }
  }

  @Put(':edit')
  async editUser(@Body() userDto: UserDto, @Res() response: Response) {
    try {
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
      console.error(e.stack);
    }
  }

  @Delete(':delete') 
  async deleteUser(@Headers() headers: Partial<UserDto>, @Res() response: Response) {
    try {
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
      console.error(e.stack);
    }
  }
}
