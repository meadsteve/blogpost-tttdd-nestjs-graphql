import { Module } from '@nestjs/common';
import { BlogpostsResolver } from './blogposts.resolver';
import { InMemoryBlogpostStorage } from './storage/blogposts.storage';

@Module({
  imports: [],
  controllers: [],
  providers: [
    BlogpostsResolver,
    {
      provide: 'BlogpostStorage',
      useClass: InMemoryBlogpostStorage,
    },
  ],
})
export class BlogpostsModule {}
