import { Injectable } from '@nestjs/common';
import { BlogPost, BlogPostContent } from '../models/blogpost.model';
import { v4 as uuidv4 } from 'uuid';

type BlogPostKeys = keyof BlogPost;
type PartialBlogPostData = {
  [k in BlogPostKeys]?: BlogPost[k];
};

export interface BlogpostStorage {
  addNewPost(post: BlogPostContent): BlogPost;

  getAllPosts(fields?: BlogPostKeys[]): PartialBlogPostData[];

  getPostById(
    id: string,
    fields?: BlogPostKeys[],
  ): PartialBlogPostData | undefined;
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

  getAllPosts(fields: BlogPostKeys[] = []): PartialBlogPostData[] {
    return this.memory.map((p) => withFilteredFields(p, fields));
  }

  getPostById(
    id: string,
    fields: BlogPostKeys[] = [],
  ): PartialBlogPostData | undefined {
    const matchedPost = this.memory.find((p) => p.id === id);
    if (!matchedPost) {
      return undefined;
    }
    return withFilteredFields(matchedPost, fields);
  }
}

function withFilteredFields(
  post: BlogPost,
  fields: BlogPostKeys[],
): PartialBlogPostData {
  if (fields.length === 0) {
    return post;
  }
  const filtered = {};
  fields.forEach((key) => (filtered[key] = post[key]));
  return filtered;
}
