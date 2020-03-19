import { Table, Column, PrimaryKey, HasOne, Model, BelongsToMany, AllowNull } from 'sequelize-typescript';
import { UserProfile } from './user-profile';
import { Groups } from 'src/modules/group/models/groups';
import { UserGroups } from 'src/modules/group/models/user-groups';

@Table
export class Users extends Model<Users> {
  @PrimaryKey
  @Column
  user_id: string;

  @Column
  userName: string;

  @Column
  password: string;

  @AllowNull(true)
  @Column
  refresh_token: string;

  @AllowNull(true)
  @Column
  access_token: string;

  @HasOne(() => UserProfile)
  user_profile: UserProfile;

  @BelongsToMany(() => Groups, () => UserGroups)
  groups: Groups[];
}
