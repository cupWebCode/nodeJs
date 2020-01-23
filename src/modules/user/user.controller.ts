import { Controller, Post, Get, Put, Delete, Body, Headers, Res, HttpStatus, UsePipes } from '@nestjs/common';
import { Response } from 'express';

import { SchemaUserBuilder } from '../../validation/schema-builder/schema-user-builder';
import { UserDto } from './dto/user.dto';
import { RequestValidatorPipe } from 'src/pipes/request-validator.pipe';
import { ResponseApiSuccess } from 'src/common/response-api';
import { UserService } from './services/user.service';

const createUserSchema = new SchemaUserBuilder().createUser<Body>().options({
  abortEarly: false,
  allowUnknown: true
});

@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}
  
  @Post()
  @UsePipes(new RequestValidatorPipe<UserDto>(createUserSchema))
  createUser(@Res() response: Response, @Body() userDto: UserDto): void {
    this.userService.createUser(userDto)
    .then((result: UserDto) => {
      response
        .json(new ResponseApiSuccess<any>(true, null, `User ${result.userName} was created successfully.`))
        .status(HttpStatus.CREATED);
    })
    .catch(e => console.error(e.stack));
  }

  @Get()
  getUser(@Headers() headers: Partial<UserDto>, @Res() response: Response): void {
  this.userService.getUser(headers.id as string)
    .then(result => {
      if (result.length) {
        const user = result[0];
        return response.json(new ResponseApiSuccess<Partial<UserDto>>(true, user, null))
          .status(HttpStatus.OK);
      }
      response
        .json({ message: "User was't found." })
        .status(HttpStatus.NO_CONTENT);
    })
    .catch(e => console.error(e.stack));
  }

  @Put(':edit')
  editUser(@Body() userDto: UserDto, @Res() response: Response): void {
    
    this.userService.editUser(userDto)
    .then((result) => {
      if (result.length && result[0]) {
        return response
        .json(new ResponseApiSuccess<any>(true, null, `User ${userDto.userName} was updated successfully.`))
        .status(HttpStatus.OK);
      }
      response
        .json({ message: "User was't found." })
        .status(HttpStatus.NO_CONTENT);
      
    })
    .catch(e => console.error(e.stack));
  }

  @Delete(':delete') 
  deleteUser(@Headers() headers: Partial<UserDto>, @Res() response: Response): void {
    this.userService.deleteUser(headers.id)
    .then((result) => {
      if (result) {
      return response
        .json(new ResponseApiSuccess<any>(true, null, `User was deleted successfully.`))
        .status(HttpStatus.OK);
      }
      response
        .json({ message: "User was't found." })
        .status(HttpStatus.NO_CONTENT);
    })
    .catch(e => console.error(e.stack));
  }
}
