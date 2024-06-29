import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MessageModel } from 'src/message/entities/message.entity';

@ObjectType({ description: 'Conversation model' })
export class ConversationModel {
  @Field(() => ID)
  id: string;
  
  @Field(() => [MessageModel])
  messages: MessageModel[];

  @Field(() => ID)
  secondParticipant: string;

  @Field(() => ID)
  firstParticipant: string;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;
}
