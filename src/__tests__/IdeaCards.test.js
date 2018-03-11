import React from 'react';
import {shallow} from 'enzyme';
import IdeaCards from '../components/IdeaCards.js';

describe('IdeaCards', () => {
  let ideaCards, idea1, idea2, visibleIdeas;

  beforeEach(() => {
    idea1 = {
      id: 1234,
      title: 'Hello',
      body: 'World!',
      quality: 'plausible'
    };

    idea2 = {
      id: 4321,
      title: 'New App!',
      body: 'Woo Hoo',
      quality: 'genius'
    };

    visibleIdeas = [idea1, idea2];
    
    ideaCards = shallow(
      <IdeaCards
        visibleIdeas={visibleIdeas}
        updateIdeaQuality={jest.fn()}
        removeIdea={jest.fn()}
        searchIdeas={jest.fn()}
        filterByQuality={jest.fn()}
      />
    );
  });

  it('should render our good friend, IdeaCards', () => {
    expect(ideaCards).toMatchSnapshot();
    
    ideaCards = shallow(
      <IdeaCards
        visibleIdeas={[]}
        updateIdeaQuality={jest.fn()}
        removeIdea={jest.fn()}
        searchIdeas={jest.fn()}
        filterByQuality={jest.fn()}
      />
    );

    expect(ideaCards).toMatchSnapshot();
  });

  it('should have a prop visibleIdeas as well as methods from the app component', () => {
    expect(ideaCards.props('visibleIdeas')).toBeDefined();
    expect(ideaCards.props('updateIdeaQuality')).toBeDefined();
    expect(ideaCards.props('removeIdea')).toBeDefined();
    expect(ideaCards.props('searchIdeas')).toBeDefined();
  });
});
