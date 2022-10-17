import { Injectable } from '@nestjs/common';
import { BlogPost } from '../models/blogpost.model';

export interface BlogpostStorage {
  addNewPost(post: BlogPost): void;

  getAllPosts(): BlogPost[];
}

@Injectable()
export class InMemoryBlogpostStorage implements BlogpostStorage {
  private memory: BlogPost[];

  constructor() {
    this.memory = [];
  }
  addNewPost(post: BlogPost): void {
    this.memory.push(post);
  }

  getAllPosts(): BlogPost[] {
    return this.memory;
  }
}
