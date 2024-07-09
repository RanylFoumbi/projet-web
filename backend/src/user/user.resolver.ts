import {
  Args,
  Mutation,
  Resolver,
  Context,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User as UserEntity } from './entity/user.entity';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Conversation as ConversationEntity } from 'src/conversation/entities/conversation.entity';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => UserEntity)
  async updateProfile(
    @Args('username') username: string,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload.FileUpload,
    @Context() context: { req: Request },
  ) {
    const imageUrl = file ? await this.storeImageAndGetUrl(file) : null;
    const userId = context.req.user.sub;
    return this.userService.updateProfile(userId, username, imageUrl);
  }

  private async storeImageAndGetUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', 'images', uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/images/${uniqueFilename}`;
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));
    return imageUrl;
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [UserEntity])
  async findUserByName(@Context() context: any, @Args('query') query?: string) {
    context.findUser = true;
    const users = this.userService.findUserByName(query);
    return (await users).map((user: User) => ({
      id: user.id,
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
    }));
  }

  @ResolveField('conversations', () => [ConversationEntity])
  async getConversations(
    @Parent() user: User,
    @Context() context: { findUser: boolean },
  ) {
    if (context.findUser) return [];
    return this.prismaService.conversation.findMany({
      where: {
        users: { some: { id: user.id } },
      },
    });
  }
}
