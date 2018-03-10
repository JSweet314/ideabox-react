import Idea from '../scripts/Idea.js';

describe('Idea', () => {
  let idea;

  beforeEach(() => {
    idea = new Idea();
  });
  it('should instantiate our good friend, Idea', () => {
    expect(idea).toBeInstanceOf(Idea);
  });

  it('should have a title and body', () => {
    idea = new Idea('title', 'body');

    expect(idea.title).toEqual('title');
    expect(idea.body).toEqual('body');
  });

  it('should have an id by default', () => {
    expect(idea.id).toBeDefined();
  });

  it('should have a default quality of swill', () => {
    expect(idea.quality).toEqual('swill');
  });
});