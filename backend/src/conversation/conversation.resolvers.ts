import { Args, ID, Resolver, Query, Mutation } from '@nestjs/graphql';
import { ConversationModel } from './entities/conversation.entity';
import { ConversationService } from './conversation.service';

@Resolver()
export class ConversationResolver {
  constructor(private readonly convService: ConversationService) {}

  @Query(() => [ConversationModel])
  async getUserConversations(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<ConversationModel[]> {
    return this.convService.getConversations(userId);
  }

  @Mutation(() => ConversationModel)
  async createConversation(
    @Args('firstParticipant', { type: () => ID }) firstParticipant: string,
    @Args('secondParticipant', { type: () => ID }) secondParticipant: string,
  ): Promise<ConversationModel> {
    return this.convService.createConversation({firstParticipant, secondParticipant });
  }

  @Mutation(() => ConversationModel)
  async deleteConversation(
    @Args('convId', { type: () => ID }) convId: string,
  ): Promise<ConversationModel> {
    return this.convService.deleteConversation(convId);
  }
}
