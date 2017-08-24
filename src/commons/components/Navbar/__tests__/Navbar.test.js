import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import 'jest-styled-components/native';
import Navbar from '../Navbar';

describe('Moicon', () => {
  it('it should render as expected', () => {
    const wrapper = renderer.create(<Navbar />);
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });
});
