import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { User } from '../../user/entity/user.entity';

@ObjectType({ description: 'Message model' })
export class Message {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => User, { nullable: true })
  sender: User;

  @Field(() => Conversation, { nullable: true })
  conversation: Conversation;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
