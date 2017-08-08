import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components/native';

import Badge from '../Badge';

describe('Badge', () => {
  it('should render expected', () => {
    const wrapper = renderer.create(<Badge />);
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });
});
