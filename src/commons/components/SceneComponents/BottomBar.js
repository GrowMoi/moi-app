import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { LANDSCAPE } from '../../../constants';

const Bar = styled(Image)`
  height: 20;
  width: ${props => props.width};
  position: absolute;
  bottom: -2;
`;

@connect(store => ({ device: store.device }))
export default class BottomBar extends Component {
  static propTypes = {
    device: PropTypes.object,
  }

  render() {
    const { device } = this.props;
    const { width, orientation } = device.dimensions;
    const currentImage = orientation === LANDSCAPE ? 'bottom_bar_landscape' : 'bottom_bar';
    return (<Bar width={width} source={{uri: currentImage}} resizeMode='contain' />);
  }
}
