import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';

@ObjectType({ description: 'Message model' })
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => User)
  sender: User;

  @Field()
  roomId: string;

  @Field()
  createdAt: Date;

  @Field()
  updateAt: Date;
}
