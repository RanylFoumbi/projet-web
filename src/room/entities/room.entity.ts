import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MessageModel } from 'src/message/entities/message.entity';
import { UserModel } from 'src/user/entity/user.entity';

@ObjectType({ description: 'Room model' })
export class RoomModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [MessageModel])
  messages: MessageModel[];

  @Field(() => [UserModel])
  participants: UserModel[];

  @Field(() => ID)
  creatorId: string;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;
}
