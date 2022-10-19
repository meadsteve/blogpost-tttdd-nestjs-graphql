import { InMemoryBlogpostStorage } from './blogposts.storage';

describe('InMemory Blog post storage', () => {
  let storage: InMemoryBlogpostStorage;

  beforeEach(async () => {
    storage = new InMemoryBlogpostStorage();
  });

  it('should start empty', () => {
    expect(storage.getAllPosts()).toEqual([]);
  });

  it('should store the data we ask it to', () => {
    const FirstPost = {
      title: 'first',
      content: 'hello!',
    };
    storage.addNewPost(FirstPost);
    expect(storage.getAllPosts()).toContainEqual(
      expect.objectContaining(FirstPost),
    );
  });

  it('should generate an id for the content it stores', () => {
    const postData = {
      title: 'first',
      content: 'hello!',
    };
    const createdPost = storage.addNewPost(postData);
    expect(createdPost.id).not.toBeNull();
  });

  it('should be possible to retrieve blogposts by id', () => {
    const postData = {
      title: 'first',
      content: 'hello!',
    };
    const createdPost = storage.addNewPost(postData);
    expect(storage.getPostById(createdPost.id)).toEqual(
      expect.objectContaining(postData),
    );
  });

  it('when fetching by id the fields returned can be restricted', () => {
    const postData = {
      title: 'first',
      content: 'hello!',
    };
    const createdPost = storage.addNewPost(postData);
    expect(storage.getPostById(createdPost.id, ['title'])).toEqual({
      title: 'first',
    });
  });

  it('should be able to filter all the post data for specific fields', () => {
    storage.addNewPost({ title: 'one', content: 'content-one' });
    storage.addNewPost({ title: 'two', content: 'content-two' });

    expect(storage.getAllPosts(['content'])).toEqual([
      { content: 'content-one' },
      { content: 'content-two' },
    ]);
  });
});
