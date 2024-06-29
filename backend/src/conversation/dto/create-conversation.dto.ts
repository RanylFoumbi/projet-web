import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateConversationDto {

  @Field(() => ID)
  firstParticipant: string;

  @Field(() => ID)
  secondParticipant: string;
}
