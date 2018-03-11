import React from 'react';
import IdeaCard from './IdeaCard.js';
import QualityFilter from './QualityFilter.js';
import PropTypes from 'prop-types';
import '../styles/CardContainer.css';

const CardContainer = (
  { visibleIdeas, updateIdeaQuality, removeIdea, searchIdeas, filterByQuality }
) => {
  return (
    <div className="card-container">
      <input
        className="search"
        type="search"
        placeholder="SEARCH"
        onChange={(e) => searchIdeas(e.target.value)}
      />
      <QualityFilter filterByQuality={filterByQuality} />
      {
        visibleIdeas.map((idea, index) =>
          <IdeaCard 
            {...idea}
            key={index}
            updateIdeaQuality={updateIdeaQuality}
            removeIdea={removeIdea}
          />
        )
      }
    </div>
  );
};

CardContainer.defaultProps = {
  visibleIdeas: []
};

CardContainer.propTypes = {
  visibleIdeas: PropTypes.arrayOf(PropTypes.object),
  removeIdea: PropTypes.func.isRequired,
  updateIdeaQuality: PropTypes.func.isRequired,
  searchIdeas: PropTypes.func.isRequired,
  filterByQuality: PropTypes.func.isRequired
};

export default CardContainer;