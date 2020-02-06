import { Inject, Injectable } from "@nestjs/common";
import { Groups } from "../models/groups";
import { GroupDto } from "../dto/group.dto";
import { Users } from "src/modules/user/models/users";
import { UserGroups } from "../models/user-groups";

@Injectable()
export class GroupDataMapper {
  constructor(
    @Inject('GROUP_REPOSITORY') private readonly groupsRepository: typeof Groups,
    @Inject('GROUP_USERG_ROUPS') private readonly groupUserRepository: typeof UserGroups,
    @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof Users,
    
    ) {}
  async create(entity: GroupDto): Promise<Groups> {
    const groupDALEntity = this.toGroupDalEntity([entity]);
    return await this.groupsRepository.create<Groups>(groupDALEntity[0]);
  }

  async assignUserToGroup(data: Partial<Users & Groups>): Promise<UserGroups> {
    const userRes = this.usersRepository.findOne({
      where: {user_id: data.user_id}
    })

    const groupsRes = this.groupsRepository.findOne({
      where: {group_id: data.group_id}
    })

    return Promise.all<Users, Groups>([userRes, groupsRes])
      .then((values: [Users, Groups]) => {
        if(values[0] && values[1]) {
          return this.groupUserRepository.create<UserGroups>(data);
        }
        return null;
    });
  }
  
  async update(entity: GroupDto): Promise<[number, Groups[]]> {
    const groupDALEntity = this.toGroupDalEntity([entity]);
    return await this.groupsRepository.update<Groups>(groupDALEntity[0], {
      where: {
        group_id: groupDALEntity[0].group_id
      }
    });
  }

  async findGroupById(group_id: string): Promise<Groups[]> {
    return await this.groupsRepository.findAll({
      where: { group_id },
      include: [{
        model: Users,
      }]
    }).then((result: Groups[]) =>  this.toDomain(result));
  }

  
  async deleteGroupById(group_id: string): Promise<number> {
    return await this.groupsRepository.destroy({
      where: { group_id }
    });
  }

  async getAllGroup(): Promise<Groups[]> {
    return await this.groupsRepository.findAll({
      include: [{
        model: Users,
      }]
    }).then((result: Groups[]) =>  this.toDomain(result));
  }

  private toGroupDalEntity(entites: any[]): GroupDto[] {
    return entites.map(entity => {
      return {
        group_id: entity.id,
        name: entity.name,
        permissions: entity.permissions.join(',')
      };
    });
  }

  private toDomain(entites: any[]): Groups[] {
    let modifiedEntities: Groups[] = [];
    if (entites.length) {
      modifiedEntities = entites.map(entity => {
        entity.permissions = entity.permissions.split(',').map(item => item.trim());
        return entity;
      });
    }
    return modifiedEntities;
  }
}
