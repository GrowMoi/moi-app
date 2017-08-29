import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components/native';

import MoiBackground from '../MoiBackground';

const initialState = {
  dimensions: {
    width: 320,
    height: 568,
    orientation: 'PORTRAIT',
  },
};

describe('MoiBackground', () => {
  it('should render expected', () => {
    const wrapper = renderer.create(<MoiBackground device={initialState} />);
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });
});
