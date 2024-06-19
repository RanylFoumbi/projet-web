import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './entity/user.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserModel> {
    return this.userService.createUser({ username, email, password });
  }

  @Query(() => UserModel)
  async getUserById(@Args('id') id: string): Promise<UserModel> {
    return this.userService.findUserById(id);
  }

  @Query(() => UserModel)
  async getUserByUsername(
    @Args('username') username: string,
  ): Promise<UserModel> {
    return this.userService.findUserByUsername(username);
  }

  @Query(() => [UserModel])
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.findAllUsers();
  }
}
