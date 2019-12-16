import { Inject, Service } from "typedi";
import "reflect-metadata";

import { Logger } from "../loaders/logger";
import { UserStorage } from "../storage/user-storage";
import { UserModel } from "../models/user";
import { User } from "../interfaces/user";

@Service()
export class UserService {
  @Inject() private userStorage: UserStorage;
  @Inject() private logger: Logger;

  constructor() {}

  getUser(userId: string): User {
    try {
      return this.userStorage.getUser(userId);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  getAllUsers(): void {}

  updateUser(user: User): void {
    try {
      this.userStorage.updateUser(user);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  deleteUser(id: string): void {
    try {
      this.userStorage.deleteUser(id);
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
}
