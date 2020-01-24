import { Users } from "../models/users";
import { Inject, Injectable } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { UserProfileDto } from "../dto/user-profile.dto";
import { UserProfile } from "../models/user-profile";
import { editUserType, editProfileType } from "../types";
import { CryptService } from "src/service/crypt/crypt.service";

@Injectable()
export class UserDataMapper {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof Users,
    @Inject('USER-PROFILE_REPOSITORY') private readonly userProfileRepository: typeof UserProfile,
    private crypt: CryptService) {}

  async create(entity: UserDto): Promise<Users> {
    const usersDALEntity = this.toUsersDalEntity([entity]);
    const userProfileDALEntity = this.toUserProfileDalEntity([entity as UserProfileDto]);
    
    const userRes = await this.usersRepository.create<Users>(usersDALEntity[0]);    
    const userPrifileRes = await this.userProfileRepository.create<UserProfile>(userProfileDALEntity[0]);

    return Promise.all<Users, UserProfile>([userRes, userPrifileRes])
      .then((values: [Users, UserProfile]) => { 
        return values[0]
    });
  }

  async editById(entity: UserDto): Promise<[number, Users[]]> {
    const usersDALEntity = this.toUsersDalEntity([entity]);
    const userProfileDALEntity = this.toUserProfileDalEntity([entity as UserProfileDto]);
    
    const userRes = await this.usersRepository.update<Users>(usersDALEntity[0], {
      where: {
        id: entity.id
      }
    });

    const userPrifileRes = await this.userProfileRepository.update<UserProfile>(userProfileDALEntity[0], {
      where: {
        profile_id: entity.id
      }
    });
   
    return Promise.all<editUserType, editProfileType>([userRes, userPrifileRes])
      .then((values: [editUserType, editProfileType]) => {
        return values[0]
    });
  }

  async findById(id: string): Promise<Users[]> {
    return await this.usersRepository.findAll({
      include: [{
        model: UserProfile,
        where: { profile_id: id }
    }]
    }).then((result: Users[]) => this.toDomain(result));
  }

  async deleteById(id: string): Promise<number> {
    return await this.usersRepository.destroy({
      where: {
        id
      }
    });
  }

  private toUsersDalEntity(entites: UserDto[] ): UserDto[] {
    return entites.map(entity => {
      return {
        id: entity.id,
        userName: entity.userName,
        password: this.crypt.encrypt(entity.password)
      } as UserDto;
    });
  }

  private toUserProfileDalEntity(entites: UserProfileDto[]): UserProfileDto[] {
    return entites.map(entity => {
      return {
        country: entity.country,
        email: entity.email,
        mobilePhone: entity.mobilePhone,
        users_id: entity.id,
        profile_id: entity.id
      } as UserProfileDto;
    });
  }

  private toDomain(entites: Users[]): Users[] {

    if (entites.length) {
      const entity = entites[0];
      entity.password = this.crypt.decrypt(entity.password);
    }
    return entites;
  }
}
