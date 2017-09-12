import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ScrollView, StyleSheet } from 'react-native';
import { Size, Palette } from '../../styles';

const ContentScreen = styled(ScrollView)`
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
  margin-bottom: ${Size.spaceMedium};
  background-color: #96be59;
`;

const styles = StyleSheet.create({
  containerScrollView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

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
        contentContainerStyle={[styles.containerScrollView, contentContainerStyle]}
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