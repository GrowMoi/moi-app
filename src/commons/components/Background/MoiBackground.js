import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { LANDSCAPE } from '../../../constants';

const Background = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => props.height};
  flex: 1;
`;

@connect(store => ({ device: store.device }))
export default class MoiBackground extends Component {
  render() {
    const { device, style } = this.props;
    const { width, height, orientation } = device.dimensions;
    const currentImage = orientation === LANDSCAPE ? 'background_tree_landscape' : 'background_tree_portrait';
    return (
      <Background style={style} width={width} height={height} source={{uri: currentImage}} resizeMode='cover'>
        {this.props.children}
      </Background>
    );
  }
}

MoiBackground.propTypes = {
  children: PropTypes.any,
  device: PropTypes.object,
  style: PropTypes.any,
};
