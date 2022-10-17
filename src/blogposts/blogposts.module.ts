import { Module } from '@nestjs/common';
import { BlogpostsResolver } from './blogposts.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [BlogpostsResolver],
})
export class BlogpostsModule {}
