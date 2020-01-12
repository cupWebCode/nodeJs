import { Inject, Service } from "typedi";
import "reflect-metadata";
import { IncomingHttpHeaders } from "http";
import { QueryResult } from "pg";

import { Logger } from "../loaders/logger";
import { UserModel } from "../models/user";
import { User } from "../interfaces/user";
import { PgService } from "./pg.service";
import * as queries from "../quieres/user.queries";

@Service()
export class UserService {
  @Inject() private logger: Logger;
  @Inject() private pg: PgService;

  private userFilteredList: User[];
  private defaultUserLimit = 10;

  constructor() { }

  async createUser(userInfo: User): Promise<QueryResult<any>> {
    try {
      const user = new UserModel(userInfo);//TODO
      return await this.pg.pool.query<User, any[]>(queries.createUser, [user.id, user.login, user.password, user.age, user.isDeleted]);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getUser(userId: string): Promise<QueryResult<User>> {
    try {
      return await this.pg.pool.query<User>(queries.getUser, [userId]);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getSortedUserList(req: IncomingHttpHeaders): Promise<User[]> {
    this.userFilteredList = [];
    return await this.pg.pool.query<User>(queries.getUserList)
      .then(data => {
        const result = this.filterBySubstring(data.rows, req.loginsubstring as string)
          .userLimit(+req.limit || this.defaultUserLimit)
          .sort(this.dynamicSort("login"));

        return Promise.resolve(result);
      });
  }

  async updateUser(user: User): Promise<boolean> {
    try {
      const query = queries.editUser(user);
      return await this.pg.pool.query<User>(query)
        .then(() => Promise.resolve(true));
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const query = queries.markUserAsDelete(id);
      return await this.pg.pool.query<User>(query)
        .then(() => Promise.resolve(true));
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
