import { Table, Column, PrimaryKey, Model } from 'sequelize-typescript';

@Table
export class Users extends Model<Users> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  userName: string;

  @Column
  country: string;

  @Column
  email: string;

  @Column
  mobilePhone: string;

  @Column
  password: string;
}
