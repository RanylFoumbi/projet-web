import {
  Args,
  ID,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Conversation as ConversationEntity } from './entities/conversation.entity';
import { Message as MessageEntity } from '../message/entities/message.entity';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { PrismaService } from 'src/prisma.service';
import { Conversation } from '@prisma/client';
import { User as UserEntity } from 'src/user/entity/user.entity';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Resolver(() => ConversationEntity)
export class ConversationResolver {
  constructor(
    private readonly convService: ConversationService,
    private readonly prismService: PrismaService,
  ) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [ConversationEntity])
  async getUserConversations(
    @Args('userId', { type: () => ID }) userId: string,
  ) {
    return this.convService.getConversations(userId);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => ConversationEntity)
  async createConversation(
    @Args('convInput') convInput: CreateConversationDto,
  ) {
    console.log('convInput', convInput);
    return this.convService.createConversation(convInput);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => ConversationEntity)
  async deleteConversation(@Args('convId', { type: () => ID }) convId: string) {
    return this.convService.deleteConversation(convId);
  }

  @ResolveField('messages', () => [MessageEntity])
  async getMessages(@Parent() conversation: Conversation) {
    const messages = this.prismService.message.findMany({
      where: {
        conversationId: conversation.id,
      },
    });
    return messages || [];
  }

  @ResolveField('participants', () => [UserEntity])
  async getParticipants(@Parent() conversation: Conversation) {
    const participants = this.prismService.user.findMany({
      where: {
        conversations: {
          some: {
            id: conversation.id,
          },
        },
      },
    });
    return participants || [];
  }
}