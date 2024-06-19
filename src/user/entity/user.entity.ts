import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoomModel } from 'src/room/entities/room.entity';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType({ description: 'User model' })
export class UserModel {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID)
  id: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  profileImg: string;

  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Field(() => [RoomModel])
  rooms: RoomModel[];

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
