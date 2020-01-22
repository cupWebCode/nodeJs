import { Injectable, Inject } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { Users } from '../models/users';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof Users) {}

  async findAll(): Promise<Users[]> { //todo check
    return this.usersRepository.findAll<Users>();
  }
  
  async createUser(user: UserDto): Promise<any> {//todo check
    return this.usersRepository.create<Users>(user);
  }

  async getUser(id: string): Promise<any> {
    return this.usersRepository.findAll({
      where: {
        id
      }
    });
  }

  async editUser(user: UserDto): Promise<any> {//todo check
    return this.usersRepository.update<Users>(user, {
      where: {
        id: user.id
      }
    });
  }

  async deleteUser(id: string): Promise<any> {//todo check
    return this.usersRepository.destroy({
      where: {
        id
      }
    });
  }
}

// Post.destroy({
//   where: {
//     status: 'inactive'
//   }
// });