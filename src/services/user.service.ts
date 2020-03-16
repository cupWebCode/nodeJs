import { Inject, Service } from "typedi";
import "reflect-metadata";

import { Logger } from "../loaders/logger";
import { UserStorage } from "../storage/user-storage";
import { UserModel } from "../models/user";
import { User } from "../interfaces/user";
import { IncomingHttpHeaders } from "http";

@Service()
export class UserService {
  @Inject() private userStorage: UserStorage;
  @Inject() private logger: Logger;

  private userFilteredList: User[];
  private defaultUserLimit = 10;

  constructor() {}

  getUser(userId: string): User {
    try {
      return this.userStorage.getUser(userId);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  getSortedUserList(req: IncomingHttpHeaders): User[] {
    this.userFilteredList = [];
    const userList: User[] = this.userStorage.getUsers();

    return this.filterBySubstring(userList, req.loginsubstring as string)
      .userLimit(+req.limit || this.defaultUserLimit)
      .sort(this.dynamicSort("login"));
  }

  updateUser(user: User): boolean {
    try {
      return this.userStorage.updateUser(user);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  deleteUser(id: string): boolean {
    try {
      return this.userStorage.deleteUser(id);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  createUser(userInfo: User): void {
    try {
      const user = new UserModel(userInfo);
      this.userStorage.addUser(user);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private filterBySubstring(users: User[], subString = ""): this {
    users.forEach(user => {
      if (user.login.indexOf(subString) !== -1) {
        this.userFilteredList.push(user);
      }
    });
    return this;
  }

  private userLimit(limit: number): User[] {
    return this.userFilteredList.slice(0, limit);
  }

  private dynamicSort(property: string): any {
    let sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return (a, b): number => {
      if (sortOrder === -1) {
        return b[property].localeCompare(a[property]);
      }
      return a[property].localeCompare(b[property]);
    };
  }
}
