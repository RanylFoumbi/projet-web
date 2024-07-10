import { InputType, Field, ID } from '@nestjs/graphql';
import { ArrayMinSize, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateConversationDto {
  @Field(() => [ID])
  @ArrayMinSize(2, {
    message: 'Conversation must contains at least 2 participants',
  })
  users: string[];

  @Field()
  @IsNotEmpty({ message: 'Conversation name is required.' })
  name: string;
}
