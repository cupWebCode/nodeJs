import "reflect-metadata";
import { Service } from "typedi";
import { User } from "../interfaces/user";

@Service()
export class UserStorage {
  private userCollection: {
    id: string;
    data: User;
  }[] = [];

  constructor() {}

  addUser(user: User): void {
    this.userCollection.push({
      id: user.id,
      data: user
    });
  }

  updateUser(user: User): void {
    this.userCollection.forEach(item => {
      if (item.id === user.id) {
        item.data = {
          ...user
        };
      }
    });
  }

  deleteUser(id: string): void {
    this.userCollection.forEach(item => (item.data.isDeleted = item.id === id));
  }

  getUser(id: string): User {
    const user = this.userCollection.find(item => item.id === id);
    return user ? user.data : null;
  }
}
