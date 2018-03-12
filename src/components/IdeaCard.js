import React from 'react';
import PropTypes from 'prop-types';
import '../styles/IdeaCard.css';

const IdeaCard = (
  {title, body, id, quality, updateIdeaQuality, removeIdea}
) => {
  return (
    <article>
      <h2>{title}</h2>
      <button 
        title="Delete Idea"
        className="deleteBtn"
        onClick={() => removeIdea(id)}>
        <span aria-label="delete button" role="img" className="deleteBtn">
          ❌
        </span>
      </button>
      <p>{body}</p>
      <p>
        <button
          title="Upvote Idea"
          className="upVoteBtn"
          onClick={e => updateIdeaQuality(e, id)}>
          <span aria-label="upvote button" role="img" className="upVoteBtn">
            👍
          </span>
        </button>
        <button
          title="Downvote Idea"
          className="downVoteBtn"
          onClick={e => updateIdeaQuality(e, id)}>
          <span aria-label="downvote button" role="img" className="downVoteBtn">
            👎
          </span>
        </button>
        <b>Quality:</b> {quality}
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

export default IdeaCard;