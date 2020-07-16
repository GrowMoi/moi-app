import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import Tree from '../Tree';

describe('Testing Tree View', () => {
  it('renders without crashing and take a snapshot of the structure', () => {
    const wrapper = shallow(<Tree />);
    // const rendered = renderer.create(<Home />).toJSON();
    const render = wrapper;
    expect(render).toMatchSnapshot();
    expect(render).toBeTruthy();
  });
});
