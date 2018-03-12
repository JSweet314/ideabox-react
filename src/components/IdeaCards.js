import React from 'react';
import IdeaCard from './IdeaCard.js';
import PropTypes from 'prop-types';
import '../styles/IdeaCards.css';

const IdeaCards = (
  { ideas, updateIdeaQuality, removeIdea, searchValue, qualityFilter}
) => {
  const visibleIdeas = ideas.filter(idea => {
    return (idea.title.includes(searchValue)
      || idea.body.includes(searchValue))
      && idea.quality.includes(qualityFilter);
  }).map(idea => <IdeaCard
    key={idea.id}
    {...idea}
    removeIdea={removeIdea}
    updateIdeaQuality={updateIdeaQuality}
  />
  );

  return (
    <div className="card-container">      
      {visibleIdeas}
    </div>
  );
};

IdeaCards.defaultProps = {
  ideas: []
};

IdeaCards.propTypes = {
  ideas: PropTypes.arrayOf(PropTypes.object),
  searchValue: PropTypes.string.isRequired,
  qualityFilter: PropTypes.string.isRequired,
  removeIdea: PropTypes.func.isRequired,
  updateIdeaQuality: PropTypes.func.isRequired
};

export default IdeaCards;