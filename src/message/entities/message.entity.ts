import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoomModel } from 'src/room/entities/room.entity';
import { UserModel } from 'src/user/entity/user.entity';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType({ description: 'Message model' })
export class MessageModel {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  id: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  content: string;

  @IsNotEmpty()
  @Field(() => UserModel)
  sender: UserModel;

  @IsNotEmpty()
  @Field(() => RoomModel)
  room: RoomModel;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
