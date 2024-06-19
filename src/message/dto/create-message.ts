import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

InputType();
export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  content: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  senderId: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  roomId: string;
}
