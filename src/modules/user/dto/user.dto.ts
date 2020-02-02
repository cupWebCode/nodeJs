export class UserDto {
  readonly id: string;
  readonly userName: string;
  readonly password: string;
  readonly user_profile?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
