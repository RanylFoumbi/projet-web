import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  creatorId: string;

  @IsString({ each: true })
  @IsNotEmpty()
  @Field(() => [ID])
  participantIds: string[];
}
