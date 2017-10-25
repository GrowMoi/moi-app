import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import backgroundPortrait from '../../../../assets/images/background/background_tree_portrait.jpg';
import backgroundLandscape from '../../../../assets/images/background/background_tree_landscape.jpg';
import { LANDSCAPE } from '../../../constants';

const Background = styled(Image)`
  width: ${props => props.width};
  height: ${props => props.height};
  flex: 1;
`;

@connect(store => ({ device: store.device }))
export default class MoiBackground extends Component {
  render() {
    const { device, style } = this.props;
    const { width, height, orientation } = device.dimensions;
    const currentImage = orientation === LANDSCAPE ? backgroundLandscape : backgroundPortrait;
    return (
      <Background style={style} width={width} height={height} source={currentImage} resizeMode='cover'>
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
