import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components/native';
import { Title, TextBody, Description, Header } from '../index';

describe('Typography', () => {
  it('it should render title expected', () => {
    const wrapper = shallow(<Title>Title</Title>);
    const tree = wrapper.dive();

    expect(tree).toMatchSnapshot();
    expect(tree).toBeTruthy();
  });

  it('it should render header expected', () => {
    const wrapper = shallow(<Header>Header</Header>).dive();

    expect(wrapper.text()).toBe('Header');
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  // TexBody
  it('it should render text body expected', () => {
    const wrapper = renderer.create(<TextBody>Text body</TextBody>);
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });

  it('it should render text body with props', () => {
    const textInverted = renderer.create(<TextBody inverted>Text body</TextBody>);
    textInverted.toJSON();
    expect(textInverted).toMatchSnapshot();

    const textPurple = renderer.create(<TextBody color='purple'>Text body</TextBody>);
    textPurple.toJSON();
    expect(textPurple).toMatchSnapshot();

    const textSecondary = renderer.create(<TextBody secondary>Text body</TextBody>);
    textSecondary.toJSON();
    expect(textSecondary).toMatchSnapshot();

    const highlightText = renderer.create(<TextBody highlight>Text body</TextBody>);
    highlightText.toJSON();
    expect(highlightText).toMatchSnapshot();
  });

  it('it should render description expected', () => {
    const wrapper = renderer.create(<Description>Description</Description>);
    wrapper.toJSON();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });
});
