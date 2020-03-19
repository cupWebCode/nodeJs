import { Table, Column, ForeignKey, Model } from 'sequelize-typescript';
import { Groups } from './groups';
import { Users } from '../../user/models/users';

@Table
export class UserGroups extends Model<UserGroups> { 
  @ForeignKey(() => Users)
  @Column
  user_id!: string;

  @ForeignKey(() => Groups)
  @Column
  group_id!: string;
}
