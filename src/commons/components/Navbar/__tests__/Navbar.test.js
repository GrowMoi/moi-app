import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import 'jest-styled-components/native';
import Navbar from '../Navbar';

const initialState = {
  dimensions: {
    width: 320,
    height: 568,
    orientation: 'PORTRAIT',
  },
};

describe('Navbar', () => {
  it('it should render as expected', () => {
    const wrapper = shallow(<Navbar device={initialState}/>);

    const render = wrapper.dive();
    expect(render).toMatchSnapshot();
  });
});
