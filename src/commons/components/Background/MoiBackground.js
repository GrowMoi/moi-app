import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { isAndroid } from 'react-native-device-detection';
import { LANDSCAPE } from '../../../constants';

const Background = styled(ImageBackground)`
position: relative;
  width: 100%;
  height: ${props => props.isAndroidLandscape ? props.heightPercent + '%' : '100%'};
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
    // console.log("TCL: MoiBackground -> render -> orientation", orientation)



    let correctHeight = height;
    const isAndroidLandscape = isAndroid && (orientation === LANDSCAPE);

    // console.log("TCL: MoiBackground -> render -> isAndroidLandscape", isAndroidLandscape)
    let percent = 100;

    if (isAndroidLandscape) {

      console.log("TCL: MoiBackground -> render -> height", height)

      const aspectRatio = width / height;
      // console.log("TCL: MoiBackground -> render -> aspectRatio", aspectRatio)


      correctHeight = height / aspectRatio;
      // console.log("TCL: MoiBackground -> render -> correctHeight", correctHeight)
      percent = (100 * correctHeight) / height;
      // console.log("TCL: MoiBackground -> render -> percent", percent)

    }


    return (
      <Background style={style} width={width} height={correctHeight} isAndroidLandscape={isAndroidLandscape} heightPercent={percent} source={{uri: currentImage}} resizeMode='stretch'>
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
