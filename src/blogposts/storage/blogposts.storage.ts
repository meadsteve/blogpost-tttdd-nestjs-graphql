import { Injectable } from '@nestjs/common';
import { BlogPost, BlogPostContent } from '../models/blogpost.model';
import { v4 as uuidv4 } from 'uuid';

export interface BlogpostStorage {
  addNewPost(post: BlogPostContent): BlogPost;

  getAllPosts(): BlogPost[];

  getPostById(id: string): BlogPost | undefined;
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

  getAllPosts(): BlogPost[] {
    return this.memory;
  }

  getPostById(id: string): BlogPost | undefined {
    return this.memory.find((p) => p.id === id);
  }
}
