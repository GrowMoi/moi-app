import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { isAndroid, isTablet } from 'react-native-device-detection';
import { LANDSCAPE } from '../../../constants';

const Background = styled(ImageBackground)`
position: relative;
  width: 100%;
  height: ${props => props.heightPercent + '%'};
`;

@connect(store => ({ device: store.device }))
export default class MoiBackground extends Component {

  // shouldComponentUpdate(newProps, newState) {
  //   return newProps.device !== this.props.device;
  // }

  render() {
    const { device, style } = this.props;
    const { width, height, orientation } = device.dimensions;
    const currentImage = orientation === LANDSCAPE ? 'background_tree_landscape' : 'background_tree_portrait';

    let correctHeight = height;
    const isAndroidLandscape = isAndroid && (orientation === LANDSCAPE);

    let percent = 100;
    if (isAndroidLandscape) {
      const aspectRatio = width / height;
      correctHeight = height / aspectRatio;
      percent = (100 * correctHeight) / height;
      if(isTablet) percent += (4.55 - aspectRatio);
    }

    return (
      <Background style={style} width={width} heightPercent={percent} source={{uri: currentImage}} resizeMode='stretch'>
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
