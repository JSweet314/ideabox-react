import React from 'react';
import {mount} from 'enzyme';
import IdeaCard from '../components/IdeaCard.js';

describe('IdeaCard', () => {
  let ideaCard, idea;

  beforeEach(() => {
    idea = {
      id: 1234,
      title: 'Hello',
      body: 'World!',
      quality: 'plausible'
    };

    ideaCard = mount(
      <IdeaCard 
        {...idea}
        updateIdeaQuality={jest.fn()}
        removeIdea={jest.fn()}
      />
    );
  });

  it('should render a card', () => {
    expect(ideaCard).toMatchSnapshot();
  });

  it('should have props title, body, id, quality, updateIdeaQuality, and removeIdea', () => {
    expect(ideaCard.props('title')).toBeDefined();
    expect(ideaCard.props('body')).toBeDefined();
    expect(ideaCard.props('id')).toBeDefined();
    expect(ideaCard.props('quality')).toBeDefined();
    expect(ideaCard.props('removeIdea')).toBeDefined();
    expect(ideaCard.props('updateIdeaQuality')).toBeDefined();
  });

  it('should call update quality if the upvote or down vote buttons are clicked', () => {
    const upVoteBtn = ideaCard.find('button.upVoteBtn');
    const downVoteBtn = ideaCard.find('button.downVoteBtn');

    upVoteBtn.simulate(
      'click',
      ({target: {className: 'upVoteBtn'}}, ideaCard.id)
    );
    upVoteBtn.simulate(
      'click',
      ({ target: { className: 'downVoteBtn' } }, ideaCard.id)
    );
    
    expect(ideaCard.props().updateIdeaQuality).toHaveBeenCalledTimes(2);
  });

  it('should call removeIdea when the delete button is clicked', () => {
    const deleteBtn = ideaCard.find('button.deleteBtn');

    deleteBtn.simulate('click');

    expect(ideaCard.props().removeIdea).toHaveBeenCalledTimes(1);
  });
});
