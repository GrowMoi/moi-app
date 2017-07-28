import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import Home from '../Home';

describe('Testing Home component', () => {
  it('renders without crashing and take a snapshot of the structure', () => {
    const wrapper = shallow(<Home />);
    // const rendered = renderer.create(<Home />).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });
});
