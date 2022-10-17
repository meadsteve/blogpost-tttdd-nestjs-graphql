import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

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
    const query = `query{
      blogposts {title, content}
    }`;
    const { body } = await request(app.getHttpServer()).post('/graphql').send({
      query: query,
    });
    expect(body.data.blogposts).toEqual([]);
  });

  it('can post a blogpost and then see that its in the list', async () => {
    // Create the post
    const creationMutation = `mutation {
      blogpost(title: "First post", content: "welcome to my blog") {title, content}
    }`;
    await request(app.getHttpServer()).post('/graphql').send({
      query: creationMutation,
    });

    // Check that the post is found in the list
    const query = `query{
      blogposts {title, content}
    }`;
    const { body } = await request(app.getHttpServer()).post('/graphql').send({
      query: query,
    });
    expect(body.data.blogposts).toContainEqual({
      title: 'First post',
      content: 'welcome to my blog',
    });
  });
});
