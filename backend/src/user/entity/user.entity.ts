import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Conversation } from 'src/conversation/entities/conversation.entity';

@ObjectType({ description: 'User model' })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email?: string;

  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => [Conversation], { nullable: true })
  conversations: Conversation[];

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
