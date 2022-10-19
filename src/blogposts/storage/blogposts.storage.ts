import { Injectable } from '@nestjs/common';
import { BlogPost, BlogPostContent } from '../models/blogpost.model';
import { v4 as uuidv4 } from 'uuid';

type BlogPostKeys = keyof BlogPost;
type PartialBlogPostData<F extends BlogPostKeys> = Pick<BlogPost, F>;

export interface BlogpostStorage {
  addNewPost(post: BlogPostContent): BlogPost;

  getAllPosts<F extends BlogPostKeys>(fields?: F[]): PartialBlogPostData<F>[];

  getPostById<F extends BlogPostKeys>(
    id: string,
    fields?: F[],
  ): PartialBlogPostData<F> | undefined;
}

@Injectable()
export class InMemoryBlogpostStorage implements BlogpostStorage {
  private memory: BlogPost[];

  constructor() {
    this.memory = [];
  }
  addNewPost(post: BlogPostContent): BlogPost {
    const newPost = {
      title: post.title,
      content: post.content,
      id: uuidv4(),
    };
    this.memory.push(newPost);
    return newPost;
  }

  getAllPosts<F extends BlogPostKeys>(fields: F[] | undefined = undefined) {
    return this.memory.map((p) => withFilteredFields(p, fields));
  }

  getPostById<F extends BlogPostKeys>(
    id: string,
    fields: F[] | undefined = undefined,
  ): PartialBlogPostData<F> | undefined {
    const matchedPost = this.memory.find((p) => p.id === id);
    if (!matchedPost) {
      return undefined;
    }
    return withFilteredFields(matchedPost, fields);
  }
}

function withFilteredFields<F extends BlogPostKeys>(
  post: BlogPost,
  fields?: F[],
): PartialBlogPostData<F> {
  if (fields === undefined) {
    return post;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const filtered: Record<F, any> = {};
  fields.forEach((key) => (filtered[key] = post[key]));
  return filtered;
}
