import { Table, Column, PrimaryKey, ForeignKey, Model } from 'sequelize-typescript';
import { Users } from './users';

@Table
export class UserProfile extends Model<UserProfile> {
  @PrimaryKey
  @Column
  profile_id: string;

  @Column
  country: string;

  @Column
  email: string;

  @Column
  mobilePhone: string;

  @Column 
  @ForeignKey(() => Users) 
  users_id: string;
}
