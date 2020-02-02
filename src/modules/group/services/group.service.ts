import { Injectable } from '@nestjs/common';
import { GroupDataMapper } from '../data-access/groupDataMapper';
import { GroupDto } from '../dto/group.dto';
import { Groups } from '../models/groups';

@Injectable()
export class GroupService {
  constructor(
    public dataMapper: GroupDataMapper) {}
    
  async createGroup(group: GroupDto): Promise<Groups> {
    return await this.dataMapper.create(group);
  }
  
  async updateGroup(group: GroupDto): Promise<[number, Groups[]]> {
    return await this.dataMapper.update(group);
  }

  async getGroup(id: string): Promise<Groups[]> {
    return this.dataMapper.findGroupById(id);
  }

  async deleteGroup(id: string): Promise<number> {
    return this.dataMapper.deleteGroupById(id);
  }

  async getAllGroup(): Promise<Groups[]> {
    return this.dataMapper.getAllGroup();
  }
}
