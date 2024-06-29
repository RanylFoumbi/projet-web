import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ConversationModel } from 'src/conversation/entities/conversation.entity';

@ObjectType({ description: 'User model' })
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => [ConversationModel], { nullable: true })
  conversations: ConversationModel[];

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
