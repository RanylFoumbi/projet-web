import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { MessageModel } from './entities/message.entity';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [MessageModel])
  async getConversationMessages(
    @Args('convId', { type: () => ID }) convId: string,
  ): Promise<MessageModel[]> {
    return this.messageService.getConversationMessages(convId);
  }

  @Mutation(() => MessageModel)
  async sendMessage(
    @Args('convId') convId: string,
    @Args('senderId') senderId: string,
    @Args('content') content: string,
  ): Promise<MessageModel> {
    return this.messageService.sendMessage(convId, senderId, content);
  }
}
