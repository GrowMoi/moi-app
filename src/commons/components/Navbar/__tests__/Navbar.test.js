import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import Navbar from '../Navbar';

const store = {
  dimensions: {
    width: 320,
    height: 568,
    orientation: 'PORTRAIT',
  },
};

describe('Navbar', () => {
  it('it should render as expected with connected redux state', () => {
    const wrapper = shallow(<Navbar device={store}/>);
    const render = wrapper.dive();
    expect(render).toMatchSnapshot();
  });
});
