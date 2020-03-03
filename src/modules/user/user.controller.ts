import { Controller, Inject, Post, Get, Put, Delete, Body, Headers, Res, HttpStatus, UsePipes, HttpException, Req } from '@nestjs/common';
import { Response, Request } from 'express';

import { SchemaUserBuilder } from '../../validation/schema-builder/schema-user-builder';
import { UserDto } from './dto/user.dto';
import { RequestValidatorPipe } from 'src/pipes/request-validator.pipe';
import { ResponseApiSuccess } from 'src/common/response-api';
import { UserService } from './services/user.service';
import { Users } from './models/users';
import { LoggerService } from 'src/service/logger/logger.service';

const createUserSchema = new SchemaUserBuilder().createUser<Body>().options({
  abortEarly: false,
  allowUnknown: true
});

@Controller('user')
export class UserController {
  constructor(private userService: UserService,
    private loggerService: LoggerService
    ) {}
  
  @Get(':list')
  async getUsersList(@Headers() headers: Partial<UserDto>, @Req() req: Request, @Res() response: Response) {
    try {
      this.loggerService.info('getUser');
      const result = await this.userService.getUser();
      if (result.length) {
        const user = result;
        return response.json(new ResponseApiSuccess<Users[]>(true, user, null))
          .status(HttpStatus.OK);
      }
      response
        .json({ message: "User was't found." })
        .status(HttpStatus.NO_CONTENT);

    } catch (e) {
      this.loggerService.error(req.method, headers.id, e.stack);
    }
  }

  @Post('/login')
  async login(@Res() res: Response, @Req() req: Request, @Body() userDto: UserDto) {
    try {
      const credentials: Partial<UserDto> = {
        userName: userDto.userName,
        password: userDto.password
      };
      const result = await this.userService.loginUser(credentials)

      if (result) {
        const user = result;
        return res.json(new ResponseApiSuccess<Users>(true, user, null))
          .status(HttpStatus.OK);
      }
      res
        .json({ message: "User was't found." })
        .status(HttpStatus.NO_CONTENT);
    } catch (e) {
      this.loggerService.error(req.method, userDto, e.message);
    }
  }

  @Post()
  @UsePipes(new RequestValidatorPipe<UserDto>(createUserSchema))
  async createUser(@Res() response: Response, @Req() req: Request, @Body() userDto: UserDto) {
    try {
      const result = await this.userService.createUser(userDto);
      this.loggerService.info('createUser', {
        ...userDto,
        password: '***'
      });
      const data = {
        refresh_token: userDto.refresh_token,
        access_token: userDto.access_token
      };
      response
        .json(new ResponseApiSuccess<any>(true, data, `User ${result.userName} was created successfully.`))
        .status(HttpStatus.CREATED);
    } catch (e) {
      this.loggerService.error(req.method, userDto, e.stack);
    }
  }

  @Get()
  async getUser(@Headers() headers: Partial<UserDto>, @Req() req: Request, @Res() response: Response) {
    try {
      this.loggerService.info('getUser', headers.id);
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
      this.loggerService.error(req.method, headers.id, e.stack);
    }
  }

  @Put(':edit')
  async editUser(@Body() userDto: UserDto, @Req() req: Request, @Res() response: Response) {
    try {
      this.loggerService.info('editUser', userDto);
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
      this.loggerService.error(req.method, userDto, e.stack);
    }
  }

  @Delete(':delete')
  async deleteUser(@Headers() headers: Partial<UserDto>, @Req() req: Request, @Res() response: Response) {
    try {
      this.loggerService.info('deleteUser', headers.id);
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
      this.loggerService.error(req.method, headers.id, e.stack);
    }
  }
}
