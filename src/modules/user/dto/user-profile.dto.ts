import { UserDto } from "./user.dto";

export class UserProfileDto extends UserDto {
  readonly profile_id?: string;
  readonly country: string;
  readonly email: string;
  readonly mobilePhone: string;
  readonly users_id: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
