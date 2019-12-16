import { User } from "../interfaces/user";

export class UserModel implements User {
  isDeleted: boolean;
  id: string;
  login: string;
  password: string;
  age: number;

  constructor(userData: User) {
    this.id = userData.id;
    this.login = userData.login;
    this.password = userData.password;
    this.age = userData.age;
    this.isDeleted = false;
  }
}
