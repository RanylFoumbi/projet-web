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
import { PrismaService } from '../prisma.service';
import { User as UserEntity } from '../user/entity/user.entity';
import { Conversation } from '../conversation/entities/conversation.entity';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/graphql-auth.guard';

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
    const message = this.messageService.sendMessage(messageInput);
    this.pubSub.publish(`newMessage.${messageInput.conversation}`, {
      newMessage: message,
    });
    return message;
  }

  @Subscription(() => MessageEntity, {
    nullable: true,
    resolve: (value) => value.newMessage,
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

  @ResolveField('conversation', () => Conversation)
  async conversation(@Parent() message: Message) {
    return this.prismaService.conversation.findUnique({
      where: {
        id: message.conversationId,
      },
    });
  }
}
