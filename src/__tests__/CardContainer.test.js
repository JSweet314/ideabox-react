import React from 'react';
import {shallow, mount} from 'enzyme';
import CardContainer from '../scripts/CardContainer.js';

describe('CardContainer', () => {
  let cardContainer, idea1, idea2, visibleIdeas;

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
    
    cardContainer = shallow(
      <CardContainer
        visibleIdeas={visibleIdeas}
        updateIdeaQuality={jest.fn()}
        removeIdea={jest.fn()}
        searchIdeas={jest.fn()}
      />
    );
  });

  it('should render our good friend, CardContainer', () => {
    expect(cardContainer).toMatchSnapshot();
    
    cardContainer = shallow(
      <CardContainer
        visibleIdeas={[]}
        updateIdeaQuality={jest.fn()}
        removeIdea={jest.fn()}
        searchIdeas={jest.fn()}
      />
    );

    expect(cardContainer).toMatchSnapshot();
  });

  it('should have a prop visibleIdeas as well as methods from the app component', () => {
    expect(cardContainer.props('visibleIdeas')).toBeDefined();
    expect(cardContainer.props('updateIdeaQuality')).toBeDefined();
    expect(cardContainer.props('removeIdea')).toBeDefined();
    expect(cardContainer.props('searchIdeas')).toBeDefined();
  });
});
