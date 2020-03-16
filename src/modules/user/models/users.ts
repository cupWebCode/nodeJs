import { Table, Column, PrimaryKey, HasOne, Model, BelongsToMany } from 'sequelize-typescript';
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

  @HasOne(() => UserProfile)
  user_profile: UserProfile;

  @BelongsToMany(() => Groups, () => UserGroups)
  groups: Groups[];
}
