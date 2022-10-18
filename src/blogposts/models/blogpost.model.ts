import { Field, ID, ObjectType } from '@nestjs/graphql';

export interface BlogPostContent {
  title: string;
  content: string;
}

@ObjectType()
export class BlogPost implements BlogPostContent {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;
}
