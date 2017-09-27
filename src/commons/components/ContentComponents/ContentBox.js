import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Size, Palette } from '../../styles';

const ContentScreen = styled(View)`
  flex: 1;
  border-radius: 10;
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  shadow-color: ${Palette.dark};
  shadow-opacity: 0.5;
  shadow-offset: -5px 5px;
  shadow-radius: 2;
  margin-top: ${Size.navbarHeight + Size.spaceXSmall};
  margin-horizontal: ${Size.spaceSmall};
  margin-bottom: ${Size.spaceSmall};
  background-color: #96be59;
  justify-content: flex-start;
  align-items: center;
`;

export default class ContentBox extends Component {
  render() {
    const {
      contentContainerStyle,
      style,
      ...rest
    } = this.props;

    return (
      <ContentScreen
        style={style}
        {...rest}>
        {this.props.children}
      </ContentScreen>
    );
  }
}

ContentBox.propTypes = {
  children: PropTypes.any,
  contentContainerStyle: PropTypes.any,
  style: PropTypes.object,
};
