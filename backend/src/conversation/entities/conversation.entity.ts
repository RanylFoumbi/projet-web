import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entity/user.entity';

@ObjectType({ description: 'Conversation model' })
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [Message])
  messages: Message[];

  @Field(() => User)
  users: User[];

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;
}
