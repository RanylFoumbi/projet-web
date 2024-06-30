import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message as MessageEntity } from './entities/message.entity';
import { Message } from '@prisma/client';
import { MessageInput } from './dto/message.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/user/entity/user.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Resolver(() => MessageEntity)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [MessageEntity])
  async getConversationMessages(
    @Args('convId', { type: () => ID }) convId: string,
  ) {
    return this.messageService.getConversationMessages(convId);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => MessageEntity)
  async sendMessage(@Args('messageInput') messageInput: MessageInput) {
    return this.messageService.sendMessage(messageInput);
  }

  @ResolveField('sender', () => User)
  async sender(@Parent() message: Message) {
    return this.prismaService.user.findUnique({
      where: {
        id: message.userId,
      },
    });
  }

  @ResolveField('conversation', () => Conversation)
  async conversation(@Parent() message: Message) {
    return this.prismaService.conversation.findUnique({
      where: {
        id: message.conversationId,
      },
    });
  }
}
