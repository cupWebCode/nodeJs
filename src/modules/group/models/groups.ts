import { Table, Column, PrimaryKey, Model, BelongsToMany } from 'sequelize-typescript';
import { Users } from '../../user/models/users';
import { UserGroups } from './user-groups';

@Table
export class Groups extends Model<Groups> {
  @PrimaryKey
  @Column
  group_id: string;

  @Column
  name: string;

  @Column
  permissions: string;

  @BelongsToMany(() => Users, () => UserGroups)
  users: Users[];
}