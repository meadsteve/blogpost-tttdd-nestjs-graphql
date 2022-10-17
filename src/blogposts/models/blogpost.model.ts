import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlogPost {
  @Field()
  title: string;

  @Field()
  content: string;
}
