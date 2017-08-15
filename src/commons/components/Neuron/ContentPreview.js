import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { TextBody, Header } from '../Typography';
import { Size, Palette } from '../../styles';

const RowContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-self: stretch;
  background-color: ${Palette.white};
  border-color: ${Palette.neutral.alpha(0.2).css()};
  border-width: 1;
`;

const ContentImage = styled(Image)`
  width: 150;
  height: 120;
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
  }

  get rowContent() {
    const { inverted, title, subtitle, description, source } = this.props;

    const content = (
      <Content key='row-description'>
        <Header ellipsizeMode='tail' numberOfLines={1}>{title}</Header>
        <TextBody small secondary>{subtitle}</TextBody>
        <TextBody small ellipsizeMode='tail' numberOfLines={4}>{description}</TextBody>
      </Content>
    );

    const image = (
      <ContentImage
        key='row-image'
        resizeMode='cover'
        source={source} />
    );

    if (inverted) return [content, image];
    return [image, content];
  }

  render() {
    const { onPress } = this.props;
    return (
      <RowContainer onPress={onPress}>
        {this.rowContent}
      </RowContainer>
    );
  }
}
