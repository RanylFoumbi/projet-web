import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message as MessageEntity } from './entities/message.entity';
import { Message } from '@prisma/client';
import { MessageInput } from './dto/message.dto';
import { PrismaService } from 'src/prisma.service';
import { User as UserEntity } from 'src/user/entity/user.entity';
import { Conversation as ConversationEntity } from 'src/conversation/entities/conversation.entity';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Resolver(() => MessageEntity)
export class MessageResolver {
  public pubSub: PubSub;

  constructor(
    private readonly messageService: MessageService,
    private readonly prismaService: PrismaService,
  ) {
    this.pubSub = new PubSub();
  }

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
    const message = await this.messageService.sendMessage(messageInput);
    this.pubSub.publish(`newMessage.${messageInput.conversation}`, message);
    return message;
  }

  @Subscription(() => MessageEntity, {
    nullable: true,
    resolve: (value) => value,
  })
  async newMessage(@Args('convId', { type: () => ID }) convId: string) {
    return this.pubSub.asyncIterator(`newMessage.${convId}`);
  }

  @ResolveField('sender', () => UserEntity)
  async sender(@Parent() message: Message) {
    return this.prismaService.user.findUnique({
      where: {
        id: message.userId,
      },
    });
  }

  @ResolveField('conversation', () => ConversationEntity)
  async conversation(@Parent() message: Message) {
    return this.prismaService.conversation.findUnique({
      where: {
        id: message.conversationId,
      },
    });
  }
}
