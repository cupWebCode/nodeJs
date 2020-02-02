import { Inject, Injectable } from "@nestjs/common";
import { Groups } from "../models/groups";
import { GroupDto } from "../dto/group.dto";
import { Users } from "src/modules/user/models/users";

@Injectable()
export class GroupDataMapper {
  constructor(
    @Inject('GROUP_REPOSITORY') private readonly groupsRepository: typeof Groups) {}

  async create(entity: GroupDto): Promise<Groups> {
    const groupDALEntity = this.toGroupDalEntity([entity]);
    return await this.groupsRepository.create<Groups>(groupDALEntity[0]);
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
