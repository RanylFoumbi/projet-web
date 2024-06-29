/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserModel } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UserService {
  constructor() {}

  private users: UserModel[] = [];

  async findUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async findUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async createUser(createUserInput: CreateUserDto) {
    const newUser: UserModel = {
      id: uuidv4(),
      ...createUserInput,
      conversations: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async findAllUsers() {
    return this.users;
  }
}
