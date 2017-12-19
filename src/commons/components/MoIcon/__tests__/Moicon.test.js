import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import MoIcon from '../MoIcon';

describe('Moicon', () => {
  it('it should render correctly with default props', () => {
    const wrapper = shallow(<MoIcon name="search" />);
    const tree = wrapper.dive();

    expect(tree).toMatchSnapshot();
    expect(tree).toBeTruthy();
  });

  it('it should render without name prop', () => {
    const wrapper = renderer.create(<MoIcon />);
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });

  it('it should render Touchable structure with onPress prop exist', () => {
    const fn = jest.fn();
    const wrapper = renderer.create(<MoIcon name='fav' onPress={fn} />);
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });
});
