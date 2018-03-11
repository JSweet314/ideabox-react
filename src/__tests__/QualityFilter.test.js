import React from 'react';
import {shallow, mount} from 'enzyme';
import QualityFilter from '../components/QualityFilter.js';

describe('QualityFilter', () => {
  it('should render our good friend, QualityFilter', () => {
    const qualityFilter = shallow(<QualityFilter filterByQuality={jest.fn()} />);
    expect(qualityFilter).toMatchSnapshot();
  });

  it('should call the filterByQuality method when options are changed', () =>{
    const qualityFilter = mount(<QualityFilter filterByQuality={jest.fn()} />);
    const select = qualityFilter.find('.quality-filter__select');

    select.simulate('change', {target: {value: 'swill'}});

    expect(qualityFilter.props().filterByQuality).toHaveBeenCalledTimes(1);
  });
});