import { Query, Resolver } from '@nestjs/graphql';
import { BlogPost } from './models/blogpost.model';

@Resolver((of) => BlogPost)
export class BlogpostsResolver {
  @Query((returns) => [BlogPost])
  async blogposts(): Promise<BlogPost[]> {
    return [];
  }
}
