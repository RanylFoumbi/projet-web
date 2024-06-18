import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/message/message.model';

@ObjectType({ description: 'Message model' })
export class Room {
  @Field(() => ID)
  id: string;

  @Field()
  messages: Message[];

  @Field()
  creatorId: string;

  @Field()
  createdAt: Date;

  @Field()
  updateAt: Date;
}
