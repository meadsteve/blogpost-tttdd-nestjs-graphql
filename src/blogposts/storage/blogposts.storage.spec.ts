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
});
