import { Injectable } from '@nestjs/common';
import { UserModel } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor() {}

  private users: UserModel[] = [
    {
      id: '1',
      username: 'ra',
      email: '',
      password: '123',
      profileImg: 'https://example.com',
      rooms: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async findUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async createUser(createUserInput: CreateUserDto) {
    return null;
  }

  async findAllUsers() {
    return this.users;
  }
}
