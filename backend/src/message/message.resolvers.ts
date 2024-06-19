import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { MessageModel } from './entities/message.entity';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [MessageModel])
  async getRoomMessages(
    @Args('roomId', { type: () => ID }) roomId: string,
  ): Promise<MessageModel[]> {
    return this.messageService.getRoomMessages(roomId);
  }

  @Mutation(() => MessageModel)
  async sendMessage(
    @Args('roomId') roomId: string,
    @Args('senderId') senderId: string,
    @Args('content') content: string,
  ): Promise<MessageModel> {
    return this.messageService.sendMessage(roomId, senderId, content);
  }
}
