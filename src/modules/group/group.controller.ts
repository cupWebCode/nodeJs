import { Controller, Post, UsePipes, Res, Body, HttpStatus, Headers, Get, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../user/services/user.service';
import { ResponseApiSuccess } from 'src/common/response-api';
import { GroupService } from './services/group.service';
import { GroupDto } from './dto/group.dto';
import { Groups } from './models/groups';

@Controller('group')
export class GroupController {
  constructor(public groupService: GroupService) {}
  
  @Post()
  async createGroup(@Res() response: Response, @Body() groupDto: GroupDto) {
    try {
      const result = await this.groupService.createGroup(groupDto);
      
      response
        .json(new ResponseApiSuccess<any>(true, null, `Group ${result.name} was created successfully.`))
        .status(HttpStatus.CREATED);

    } catch (e) {
      console.error(e.stack);
    }
  }

  @Get()
  async getGroup(@Headers() headers: Partial<GroupDto>, @Res() response: Response) {
    try {
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
      console.error(e.stack);
    }
  }

  @Get('all')
  async getAllGroup(@Res() response: Response) {
    try {
      const result = await this.groupService.getAllGroup();
      
      if (result && result.length) {
        const groups = result;
        return response.json(new ResponseApiSuccess<Groups[]>(true, groups, null))
          .status(HttpStatus.OK);
      }
      response
        .json({ message: "No groups." })
        .status(HttpStatus.NO_CONTENT);

    } catch (e) {
      console.error(e.stack);
    }
  }

  @Put()
  async updateGroup(@Res() response: Response, @Body() groupDto: GroupDto) {
    try {
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
      console.error(e.stack);
    }
  }

  @Delete()
  async deleteGroup(@Headers() headers: Partial<GroupDto>, @Res() response: Response) {
    try {
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
      console.error(e.stack);
    }
  }
}
