import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogPost } from './models/blogpost.model';
import { Inject, NotImplementedException } from '@nestjs/common';
import { BlogpostStorage } from './storage/blogposts.storage';

@Resolver((of) => BlogPost)
export class BlogpostsResolver {
  constructor(@Inject('BlogpostStorage') private storage: BlogpostStorage) {}

  @Query((returns) => [BlogPost])
  async blogposts(): Promise<BlogPost[]> {
    return this.storage.getAllPosts();
  }

  @Query((returns) => BlogPost, { nullable: true })
  async blogpost(@Args('id') id: string): Promise<BlogPost | undefined> {
    return this.storage.getPostById(id);
  }

  @Mutation((returns) => BlogPost, { name: 'blogpost' })
  async createBlogPost(
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<BlogPost> {
    return this.storage.addNewPost({ title, content });
  }
}
