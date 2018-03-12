import React from 'react';
import PropTypes from 'prop-types';
import '../styles/QualityFilter.css';

const QualityFilter = ({filterByQuality, searchIdeas}) => {
  return (
    <div className="quality-filter">
      <input
        className="search"
        type="search"
        placeholder="SEARCH"
        onChange={(e) => searchIdeas(e.target.value)}
      />
      <label htmlFor="">
        <span>Filter by Idea Quality: </span>  
        <select 
          name="quality"
          className="quality-filter__select"
          onChange={(e) => filterByQuality(e.target.value)}>
          <option value="all">all</option>
          <option value="swill">swill</option>
          <option value="plausible">plausible</option>
          <option value="genius">genius</option>
        </select>
      </label>
    </div>
  );
};

QualityFilter.propTypes = {
  filterByQuality: PropTypes.func.isRequired
};

export default QualityFilter;
