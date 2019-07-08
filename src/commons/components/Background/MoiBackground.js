import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { LANDSCAPE } from '../../../constants';
import { setHeightPercent } from '../../../actions/deviceActions';
import deviceUtils from '../../utils/device-utils';

const Background = styled(ImageBackground)`
position: relative;
  width: 100%;
  height: ${props => props.heightPercent + '%'};
`;

@connect(store => ({
  device: store.device
}),
{
  setHeightPercent: setHeightPercent,
})
export default class MoiBackground extends Component {

  shouldSetHeightPercent = true;

  getPercentHeight() {
    const { device } = this.props;
    let heightPercent = device.heightPercent;
    const isAndroidLandscape = deviceUtils.isAndroidLandscape(device.dimensions);
    if(isAndroidLandscape && !heightPercent) {
      heightPercent = deviceUtils.getHeigthPercentage(device.dimensions)
      this.props.setHeightPercent(heightPercent);
    }

    return isAndroidLandscape ? heightPercent : 100;
  }

  render() {
    const { device, style } = this.props;
    const { orientation } = device.dimensions;
    const currentImage = orientation === LANDSCAPE ? 'background_tree_landscape' : 'background_tree_portrait';
    const percentHeight = this.getPercentHeight();

    return (
      <Background style={style} heightPercent={percentHeight} source={{ uri: currentImage }} resizeMode='stretch'>
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
