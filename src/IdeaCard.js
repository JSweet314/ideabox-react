import React from 'react';
import './styles/IdeaCard.css';
import PropTypes from 'prop-types';

export const IdeaCard = (
  {title, body, id, quality, updateIdeaQuality, removeIdea}
) => {
  return (
    <article>
      <h2>{title}</h2>
      <button
        title="Delete Idea"
        className="deleteBtn"
        onClick={e => removeIdea(id)}
      >
        <span 
          aria-label="delete button"
          role="img" 
          className="deleteBtn"
        >
          ❌
        </span>
      </button>
      <p>{body}</p>
      <p><b>Quality:</b> {quality}
        <button
          title="Downvote Idea"
          className="downVoteBtn"
          onClick={e => updateIdeaQuality(e, id)}
          
        >
          <span 
            aria-label="downvote button" 
            role="img" 
            className="downVoteBtn"
          >
            👎
          </span>
        </button>
        <button
          title="Upvote Idea"
          className="upVoteBtn"
          onClick={e => updateIdeaQuality(e, id)}
          aria-label="upvote button"
        >
          <span 
            aria-label="upvote button" 
            role="img" 
            className="upVoteBtn"
          >
            👍
          </span>
        </button>
      </p>
      
    </article>
  );
};

IdeaCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  quality: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  updateIdeaQuality: PropTypes.func.isRequired,
  removeIdea: PropTypes.func.isRequired
};