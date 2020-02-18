import { Controller, Post, Res, Body, HttpStatus, Headers, Get, Put, Delete, Req, Inject } from '@nestjs/common';
import { Response, Request } from 'express';
import { Logger } from 'winston';
import { ResponseApiSuccess } from 'src/common/response-api';
import { LoggerService } from 'src/service/logger/logger.service';
import { GroupService } from './services/group.service';
import { GroupDto } from './dto/group.dto';
import { Groups } from './models/groups';
import { Users } from '../user/models/users';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService,
    private loggerService: LoggerService) {}
  
  @Post()
  async createGroup(@Res() response: Response, @Req() req: Request, @Body() groupDto: GroupDto) {
    try {
      this.loggerService.info('createGroup', groupDto);
      const result = await this.groupService.createGroup(groupDto);
      
      response
        .json(new ResponseApiSuccess<any>(true, null, `Group ${result.name} was created successfully.`))
        .status(HttpStatus.CREATED);

    } catch (e) {
      this.loggerService.error(req.method, groupDto, e.stack);
    }
  }

  @Post(':id/user')
  async addUsersToGroup(@Res() response: Response, @Req() req: Request, @Body() body: Partial<Users>) {
    const data = {
      group_id: req.params.id,
      user_id: body.user_id
    };
    try {
      this.loggerService.info('assignUserTogroup', data);
      const result = await this.groupService.assignUserTogroup(data);

      if (result ) {
        return response.json(new ResponseApiSuccess<Groups>(true, result, null))
          .status(HttpStatus.OK);
      }
     
      response
        .json({ message: 'Specified group or user were not found.'})
        .status(HttpStatus.NO_CONTENT);
    } catch (e) {
      this.loggerService.error(req.method, data, e.stack);
    }
  }

  @Get()
  async getGroup(@Headers() headers: Partial<GroupDto>, @Req() req: Request, @Res() response: Response) {
    try {
      this.loggerService.info('getGroup', headers.group_id);
      const result = await this.groupService.getGroup(headers.group_id as string);
      
      if (result && result.length) {
        const group = result;
        return response.json(new ResponseApiSuccess<Groups>(true, group[0], null))
          .status(HttpStatus.OK);
      }
      response
        .json({ message: "Group was't found." })
        .status(HttpStatus.NO_CONTENT);

    } catch (e) {
      this.loggerService.error(req.method, headers.group_id, e.stack);
    }
  }

  @Get('all')
  async getAllGroup(@Res() response: Response, @Req() req: Request) {
    try {
      this.loggerService.info('getAllGroup');
      const result = await this.groupService.getAllGroup();
      
      if (result && result.length) {
        const groups = result;
        return response.json(new ResponseApiSuccess<Groups[]>(true, groups, null))
          .status(HttpStatus.OK);
      }
      response
        .json({ message: 'No groups.' })
        .status(HttpStatus.NO_CONTENT);
    } catch (e) {
      this.loggerService.error(req.method, '', e.stack);
    }
  }

  @Put()
  async updateGroup(@Res() response: Response, @Req() req: Request, @Body() groupDto: GroupDto) {
    try {
      this.loggerService.info('updateGroup', groupDto);
      const result = await this.groupService.updateGroup(groupDto);

      if (result && result.length) {
        return response
          .json(new ResponseApiSuccess<any>(true, null, `Group ${groupDto.name} has been updated successfully.`))
          .status(HttpStatus.CREATED);
      }
      response
        .json({ message: "Group was't found." })
        .status(HttpStatus.NO_CONTENT);

    } catch (e) {
      this.loggerService.error(req.method, groupDto, e.stack);
    }
  }

  @Delete()
  async deleteGroup(@Headers() headers: Partial<GroupDto>, @Req() req: Request, @Res() response: Response) {
    try {
      this.loggerService.info('deleteGroup', headers.group_id);
      const result = await this.groupService.deleteGroup(headers.group_id);
   
      if (result) {
        return response
          .json(new ResponseApiSuccess<any>(true, null, `User has been deleted successfully.`))
          .status(HttpStatus.OK);
        }
        response
          .json({ message: "User was't found." })
          .status(HttpStatus.NO_CONTENT);
    } catch (e) {
      this.loggerService.error(req.method, headers.group_id, e.stack);
    }
  }
}
