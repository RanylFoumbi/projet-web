import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoomModel } from 'src/room/entities/room.entity';

@ObjectType({ description: 'User model' })
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  profileImg: string;

  @Field(() => String)
  email: string;

  @Field(() => [RoomModel])
  rooms: RoomModel[];

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
