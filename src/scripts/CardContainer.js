import React from 'react';
import IdeaCard from './IdeaCard.js';
import PropTypes from 'prop-types';
import '../styles/CardContainer.css';

const CardContainer = (
  { visibleIdeas, updateIdeaQuality, removeIdea, searchIdeas }
) => {
  return (
    <div className="card-container">
      <input
        className="search"
        type="search"
        placeholder="SEARCH"
        onChange={(e) => searchIdeas(e.target.value)}
      />
      {
        visibleIdeas.map((idea, index) =>
          <IdeaCard 
            key={index}
            updateIdeaQuality={updateIdeaQuality}
            removeIdea={removeIdea}
            {...idea}
          />
        )
      }
    </div>
  );
};

CardContainer.propTypes = {
  visibleIdeas: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeIdea: PropTypes.func.isRequired,
  updateIdeaQuality: PropTypes.func.isRequired,
  searchIdeas: PropTypes.func.isRequired
};

export default CardContainer;