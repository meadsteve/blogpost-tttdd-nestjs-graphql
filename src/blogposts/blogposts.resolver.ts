import { Query, Resolver } from '@nestjs/graphql';
import { NotImplementedException } from '@nestjs/common';
import { BlogPost } from './models/blogpost.model';

@Resolver((of) => BlogPost)
export class BlogpostsResolver {
  @Query((returns) => [BlogPost])
  async blogposts(): Promise<BlogPost[]> {
    throw new NotImplementedException('CODE ME!');
  }
}
