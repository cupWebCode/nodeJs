import { Users } from "../models/users";
import { Inject, Injectable } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class UserDataMapper {
  constructor(@Inject('USERS_REPOSITORY') private readonly usersRepository: typeof Users) {}

  async create(entity: UserDto): Promise<Users> {
    const modifiedEntity = this.toDalEntity([entity]);
    return await this.usersRepository.create<Users>(modifiedEntity[0]);
  }

  async editById(entity: UserDto): Promise<[number, Users[]]> {
    const modifiedEntity = this.toDalEntity([entity]);
    return await this.usersRepository.update<Users>(modifiedEntity[0], {
      where: {
        id: entity.id
      }
    });
  }

  async findById(id: string): Promise<Users[]> {
    return await this.usersRepository.findAll({
      where: {
        id
      }
    }).then((result: Users[]) => this.toDomain(result));
  }

  async deleteById(id: string): Promise<number> {
    return await this.usersRepository.destroy({
      where: {
        id
      }
    });
  }

  private toDalEntity(entites: UserDto[]): UserDto[] {//TODO ADD CRYPTO PASSWORD
    return entites.map(entity => entity);
  }

  private toDomain(entites: Users[]): Users[] {
    return entites.map(entity => entity);
  }
}
