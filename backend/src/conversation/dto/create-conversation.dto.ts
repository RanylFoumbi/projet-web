import { InputType, Field, ID } from '@nestjs/graphql';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateConversationDto {

  @Field(() => [ID])
  @ArrayNotEmpty({ message: 'Conversation must contains at less 2 participants' })
  users: string[];

  @Field()
  @IsNotEmpty({ message: 'Conversation name is required.' })
  name: string;
}
