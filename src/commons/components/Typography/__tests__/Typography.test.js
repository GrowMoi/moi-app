import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components/native';
import { Title, TextBody, Description } from '../index';

describe('Typography', () => {
  it('it should render title expected', () => {
    const wrapper = shallow(<Title />);
    const tree = wrapper.dive();

    expect(tree).toMatchSnapshot();
    expect(tree).toBeTruthy();
  });

  it('it should render text body expected', () => {
    const wrapper = renderer.create(<TextBody />);
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });

  it('it should render description expected', () => {
    const wrapper = renderer.create(<Description />);
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });
});
