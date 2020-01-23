import { Table, Column, PrimaryKey, HasOne, ForeignKey, Model } from 'sequelize-typescript';
import { UserProfile } from './user-profile';

@Table
export class Users extends Model<Users> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  userName: string;

  @Column
  password: string;

  @HasOne(() => UserProfile)
  user_profile: UserProfile;
}
