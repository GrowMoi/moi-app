import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import 'jest-styled-components/native';
import ActionSheet from '../ActionSheet';

const options = [
  { label: 'Galeria', icon: 'md-photos' },
  { label: 'Recomendaciones', icon: 'md-thumbs-up' },
  { label: 'Links', icon: 'md-link' },
  { label: 'Notas', icon: 'md-create' },
];

describe('Action Sheet', () => {
  it('it should render as expected', () => {
    const wrapper = renderer.create(
      <ActionSheet
        visible
        options={options}
        hasCancelOption />
    );
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });
});
