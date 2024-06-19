import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MessageModel } from 'src/message/entities/message.entity';
import { UserModel } from 'src/user/entity/user.entity';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType({ description: 'Room model' })
export class RoomModel {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  id: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @Field(() => [MessageModel])
  messages: MessageModel[];

  @IsNotEmpty()
  @Field(() => [UserModel])
  participants: UserModel[];

  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  creatorId: string;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;
}
