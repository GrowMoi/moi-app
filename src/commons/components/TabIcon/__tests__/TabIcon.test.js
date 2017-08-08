import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components/native';
import TabIcon from '../TabIcon';

describe('Moicon', () => {
  it('it should render correctly with default props', () => {
    const wrapper = shallow(<TabIcon />);
    const tree = wrapper.dive();

    expect(tree).toMatchSnapshot();
    expect(tree).toBeTruthy();
  });

  it('it should render without name prop', () => {
    const wrapper = renderer.create(<TabIcon name="task" />);
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });
});
