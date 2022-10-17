import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogPost } from './models/blogpost.model';
import { Inject } from '@nestjs/common';
import { BlogpostStorage } from './storage/blogposts.storage';

@Resolver((of) => BlogPost)
export class BlogpostsResolver {
  constructor(@Inject('BlogpostStorage') private storage: BlogpostStorage) {}

  @Query((returns) => [BlogPost])
  async blogposts(): Promise<BlogPost[]> {
    return this.storage.getAllPosts();
  }

  @Mutation((returns) => BlogPost, { name: 'blogpost' })
  async createBlogPost(
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<BlogPost> {
    const newPost = { title, content };
    this.storage.addNewPost(newPost);
    return newPost;
  }
}
