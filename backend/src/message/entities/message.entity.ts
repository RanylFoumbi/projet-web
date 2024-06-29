import { Field, ID, ObjectType, ResolveField } from '@nestjs/graphql';
import { ConversationModel } from '../../conversation/entities/conversation.entity';
import { UserModel } from '../../user/entity/user.entity';

@ObjectType({ description: 'Message model' })
export class MessageModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => UserModel)
  sender: UserModel;

  @Field(() => ConversationModel)
  conversation: ConversationModel;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
