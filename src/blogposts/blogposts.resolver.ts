import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogPost } from './models/blogpost.model';
import { Inject, NotImplementedException } from '@nestjs/common';
import { BlogpostStorage } from './storage/blogposts.storage';

function requestedGraphqlFields(info: any): string[] {
  return info.fieldNodes[0].selectionSet.selections.map(
    (item) => item.name.value,
  );
}

@Resolver((of) => BlogPost)
export class BlogpostsResolver {
  constructor(@Inject('BlogpostStorage') private storage: BlogpostStorage) {}

  @Query((returns) => [BlogPost])
  async blogposts(): Promise<BlogPost[]> {
    return this.storage.getAllPosts();
  }

  @Query((returns) => BlogPost, { nullable: true })
  async blogpost(
    @Args('id') id: string,
    @Info() info: any,
  ): Promise<BlogPost | undefined> {
    const fields = requestedGraphqlFields(info);
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
