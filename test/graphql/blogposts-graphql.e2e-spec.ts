import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

async function getAllBlogPosts(app: INestApplication) {
  const query = `query{
      blogposts {title, content}
    }`;
  const { body } = await request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: query,
    })
    .expect(200);
  return body.data.blogposts;
}

async function createBlogPost(app: INestApplication, { title, content }) {
  const creationMutation = `mutation {
      blogpost(title: "${title}", content: "${content}") {title, content}
    }`;
  await request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: creationMutation,
    })
    .expect(200);
}

describe('Blog Posts (graphql e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('returns no posts when we dont have any', async () => {
    const posts = await getAllBlogPosts(app);
    expect(posts).toEqual([]);
  });

  it('can post a blogpost and then see that its in the list', async () => {
    const post = {
      title: 'My first post',
      content: 'welcome to the blog',
    };

    await createBlogPost(app, post);
    const posts = await getAllBlogPosts(app);
    expect(posts).toContainEqual(post);
  });
});
