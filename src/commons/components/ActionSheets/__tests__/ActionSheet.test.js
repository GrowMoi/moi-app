import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components/native';
import ActionSheet from '../ActionSheet';

const options = [
  { label: 'Galeria', icon: 'md-photos' },
  { label: 'Recomendaciones', icon: 'md-thumbs-up' },
  { label: 'Links', icon: 'md-link' },
  { label: 'Notas', icon: 'md-create' },
];

describe('Typography', () => {
  it('it should render as expected', () => {
    const wrapper = renderer.create(<ActionSheet options={options} />);
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });
});
