import { User } from "../interfaces/user";

export class UserModel implements User {
  id: string;
  userName: string;
  password: string;
  email: string;

  constructor(userData: User) {
    this.id = userData.id;
    this.userName = userData.userName;
    this.password = userData.password;
    this.email = userData.email;
  }
}
