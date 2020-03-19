import * as _ from "lodash";
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
  
  async login(entity: Partial<UserDto>): Promise<Partial<Users>> {
   return await this.getAll()
      .then(res => {
        let employee = this.findUser(res, entity.userName, entity.password);
        if (!employee) {
          return Promise.reject();
        }
        delete employee.password;
        return employee;
      })
      .then(user => {
        const tokens = {
          access_token: entity.access_token,
          refresh_token: entity.refresh_token,
        };
        this.usersRepository.update<Users>(tokens, {
          where: {
            user_id: user.user_id
          }
        });
        return {
          ...user,
          ...tokens
        };
       })
      .catch(e => {
        return e;
      });
  }

  async create(entity: UserDto): Promise<Users> {
    const usersDALEntity = this.toUsersDalEntity([entity]);
    const userProfileDALEntity = this.toUserProfileDalEntity([entity as UserProfileDto]);
    
    const userRes = await this.usersRepository.create<Users>(usersDALEntity[0]);
    const userProfileRes = await this.userProfileRepository.create<UserProfile>(userProfileDALEntity[0]);

    return Promise.all<Users, UserProfile>([userRes, userProfileRes])
      .then((values: [Users, UserProfile]) => { 
        return values[0]
    });
  }

  async editById(entity: UserDto): Promise<[number, Users[]]> {
    const usersDALEntity = this.toUsersDalEntity([entity]);
    const userProfileDALEntity = this.toUserProfileDalEntity([entity as UserProfileDto]);
    
    const userRes = await this.usersRepository.update<Users>(usersDALEntity[0], {
      where: {
        user_id: entity.id
      }
    });

    const userProfileRes = await this.userProfileRepository.update<UserProfile>(userProfileDALEntity[0], {
      where: {
        profile_id: entity.id
      }
    });
   
    return Promise.all<editUserType, editProfileType>([userRes, userProfileRes])
      .then((values: [editUserType, editProfileType]) => {
        return values[0]
    });
  }

  async findById(id: string): Promise<Users[]> {
    return await this.usersRepository.findAll({
      where: { user_id: id },
    }).then((result: Users[]) => this.toDomain(result));
  }

  async getAll(): Promise<Users[]> {
    return await this.usersRepository.findAll({
    }).then((result: Users[]) => {
      return this.toDomain(result)
    });
  }

  async deleteById(id: string): Promise<number> {
    return await this.usersRepository.destroy({
      where: {
        user_id: id
      }
    });
  }

  private toUsersDalEntity(entites: UserDto[] ): Users[] {
    return entites.map(entity => {
      return {
        user_id: entity.id,
        userName: entity.userName,
        password: this.crypt.encrypt(entity.password),
      } as Users;
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
    let modifiedEntities = [];
    if (entites.length) {
      
      modifiedEntities = entites.map(entity => {
        if (entity.password) {
          const obj = {
            user_id: entity.user_id,
            userName: entity.userName,
            password: entity.password ? this.crypt.decrypt(entity.password) : '',
            refresh_token: entity.refresh_token,
            access_token: entity.access_token,
            user_profile: entity.user_profile,
            groups: entity.groups
          };
          return obj;
        }
      
        return entity;
      });
    }
    return modifiedEntities as Users[];
  }

  private findUser(data: Users[], userName: string, password: string): Users {
    let employee = _.find(data, { userName: userName });
    if (employee !== undefined && employee.password === password) {
      return employee;
    }
  }
}
