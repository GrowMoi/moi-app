import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { TextBody, Header } from '../Typography';
import { Size, Palette } from '../../styles';

const RowContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-self: stretch;
  background-color: ${(props) => {
    if (props.inverted) return '#b9cc91';
    return '#9fbc65';
  }};
  border-radius: 10;
  shadow-color: ${Palette.dark};
  shadow-opacity: 0.2;
  shadow-offset: -5px 5px;
  shadow-radius: 2;
  margin-bottom: ${Size.spaceSmall};
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  border-color: transparent;
  border-right-color: ${(props) => {
    if (props.inverted) return 'transparent';
    return Palette.white.alpha(0.4).css();
  }};
  border-top-color: ${Palette.white.alpha(0.4).css()};
  border-left-color: ${(props) => {
    if (props.inverted) return Palette.white.alpha(0.4).css();
    return 'transparent';
  }};
  border-width: 2;
`;

const imageWidth = 150;
const imageHeight = 120;
const aspect = imageWidth / imageHeight;
const ContentImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspect)};
  background-color: ${Palette.dark};
`;

const Content = styled(View)`
  flex: 1;
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceXSmall};
`;

export default class ContentPreview extends Component {
  static propTypes = {
    inverted: PropTypes.bool,
    source: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    width: PropTypes.number,
  }

  static defaultProps = {
    width: 100,
  }

  get rowContent() {
    const { inverted, title, subtitle, description, source, width } = this.props;

    const content = (
      <Content key='row-description'>
        <Header ellipsizeMode='tail' numberOfLines={2}>{title}</Header>
        <TextBody small secondary>{subtitle}</TextBody>
        <TextBody small ellipsizeMode='tail' numberOfLines={4}>{description}</TextBody>
      </Content>
    );

    const image = (
      <ContentImage
        width={width}
        key='row-image'
        resizeMode='cover'
        source={source} />
    );

    if (inverted) return [content, image];
    return [image, content];
  }

  render() {
    const { onPress, inverted, id } = this.props;
    return (
      <RowContainer id={id} onPress={onPress} inverted={inverted}>
        {this.rowContent}
      </RowContainer>
    );
  }
}
