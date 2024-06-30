import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType({ description: 'Message input model' })
export class MessageInput {

  @Field(() => String)
  @IsNotEmpty({ message: 'Content is required.' })
  content: string;

  @Field(() => ID)
  @IsNotEmpty({ message: 'Sender is required.' })
  sender: string;

  @Field(() => ID)
  @IsNotEmpty({ message: 'Conversation is required.' })
  conversation: string;
}
