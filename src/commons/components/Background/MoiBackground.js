import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { LANDSCAPE } from '../../../constants';
import { setHeightPercent } from '../../../actions/deviceActions';
import deviceUtils from '../../utils/device-utils';
import Orientation from 'react-native-orientation';

const Background = styled(ImageBackground)`
position: relative;
  width: 100%;
  height: 100%;
`;

// const Background = styled(ImageBackground)`
// position: relative;
//   width: 100%;
//   height: ${props => props.heightPercent + '%'};
// `;

class MoiBackground extends Component {

  shouldSetHeightPercent = true;

  componentDidMount() {
    Orientation.lockToPortrait();
  }

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

    //FIXME: temporarily blocked landscape, change this.
    // const currentImage = orientation === LANDSCAPE ? 'background_tree_landscape' : 'background_tree_portrait';
    const percentHeight = this.getPercentHeight();

    return (
      <Background style={style} heightPercent={percentHeight} source={{ uri: 'background_tree_dark_portrait' }} resizeMode='stretch'>
        {this.props.children}
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  device: state.device,
})

const mapDispatchToProps = {
  setHeightPercent: setHeightPercent,
}

MoiBackground.propTypes = {
  children: PropTypes.any,
  device: PropTypes.object,
  style: PropTypes.any,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoiBackground);
