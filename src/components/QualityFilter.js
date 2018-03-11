import React from 'react';
import PropTypes from 'prop-types';
import '../styles/QualityFilter.css';

const QualityFilter = ({filterByQuality}) => {
  return (
    <label 
      htmlFor=""
      className="quality-filter">
      <span>Filter Ideas By Quality: </span>  
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
  );
};

QualityFilter.propTypes = {
  filterByQuality: PropTypes.func.isRequired
};

export default QualityFilter;
