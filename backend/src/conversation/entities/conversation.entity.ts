import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entity/user.entity';

@ObjectType({ description: 'Conversation model' })
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [Message])
  messages: Message[];

  @Field(() => ID)
  creatorId: string;

  @Field(() => User)
  users: User[];

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
