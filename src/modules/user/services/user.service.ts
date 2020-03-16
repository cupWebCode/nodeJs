import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { Users } from '../models/users';
import { UserDataMapper } from '../data-access/userDataMapper';
import { editUserType } from '../types';

@Injectable()
export class UserService {
  constructor(
    public dataMapper: UserDataMapper) {}
  
  async createUser(user: UserDto): Promise<Users> {
    return await this.dataMapper.create(user);
  }

  async getUser(id: string): Promise<Users[]> {
    return this.dataMapper.findById(id);
  }

  async editUser(user: UserDto): Promise<editUserType> {
    return this.dataMapper.editById(user);
  }

  async deleteUser(id: string): Promise<number> {
    return this.dataMapper.deleteById(id);
  }
}
