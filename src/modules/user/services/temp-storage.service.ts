import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user';

@Injectable()
export class TempStorageService {

  private userCollection: {
    id: string;
    data: User;
  }[] = [];

  constructor() { }

  addUser(user: User): void {
    this.userCollection.push({
      id: user.id,
      data: user
    });
  }

  updateUser(user: User): boolean {
    let success = false;
    this.userCollection.forEach(item => {
      if (item.id === user.id) {
        item.data = {
          ...user
        };
        success = true;
      }
    });
    return success;
  }

  deleteUser(id: string): boolean {
    let success = false;
    // this.userCollection.forEach(item => {
    //   success = item.data.isDeleted = item.id === id;
    // });
    return success;
  }

  getUser(id?: string): User {
    const user = this.userCollection.find(item => item.id === id);
    return user ? user.data : null;
  }

  getUsers(): User[] {
    return this.userCollection.map(item => item.data);
  }

}
