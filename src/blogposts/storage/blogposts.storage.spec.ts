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
    expect(storage.getAllPosts()).toContainEqual(FirstPost);
  });
});
