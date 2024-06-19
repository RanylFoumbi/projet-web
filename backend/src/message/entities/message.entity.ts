import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoomModel } from '../../room/entities/room.entity';
import { UserModel } from '../../user/entity/user.entity';

@ObjectType({ description: 'Message model' })
export class MessageModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => UserModel)
  sender: UserModel;

  @Field(() => RoomModel)
  room: RoomModel;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
