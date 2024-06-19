import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateRoomDto {
  @Field(() => ID)
  name: string;

  @Field(() => ID)
  creatorId: string;

  @Field(() => [ID])
  participantIds: string[];
}
