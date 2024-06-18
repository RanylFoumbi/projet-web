import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User model' })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  profileImg: string;

  @Field()
  email?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
