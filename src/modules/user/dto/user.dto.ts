export class UserDto {
  readonly id: string;
  readonly userName: string;
  readonly password: string;
  readonly user_profile?: string;
  readonly refresh_token?: string;
  readonly access_token?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
