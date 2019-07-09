import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ImageBackground, Image, Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { LANDSCAPE, PORTRAIT } from '../../../constants';
import deviceUtils from '../../utils/device-utils';

const isTablet = deviceUtils.isTablet();

const TreeContainer = styled(ImageBackground)`
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

const ImageContainer = styled(View)`
  ${(props) => !!props.width && css`
    width: ${props.width};
  `}
  ${props => !!props.height && css`
    height: ${props.height};
  `}
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

const ProfileImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => props.height};
`;

@connect(store => ({
  device: store.device,
}))
export default class TreeScreenShot extends Component {
  state = {
    imageWidth: 375,
    imageHeight: 667,
  }

  componentWillMount() {
    const { profileImage } = this.props;
    if (!profileImage) return;
    Image.getSize(profileImage, (width, height) => this.setState({ imageWidth: width, imageHeight: height }));
  }

  get imageOrientation() {
    const { imageWidth, imageHeight } = this.state;
    return imageWidth > imageHeight ? LANDSCAPE : PORTRAIT;
  }

  calculateImageHeight(width, height, containerWidth) {
    const percentageSize = (containerWidth * 100) / width;
    return height * (percentageSize / 100);
  }

  // get calculateImageWidth() {
  //   const { frame, width, device: { dimensions: { orientation } } } = this.props;

  //   const imageOrientation = this.imageOrientation;

  //   if (isTablet) {
  //     return frame ? width + 40 : width + 200
  //   }

  //   if ((orientation === PORTRAIT && imageOrientation === PORTRAIT) || (orientation === LANDSCAPE && imageOrientation === LANDSCAPE)) {
  //     return orientation === PORTRAIT ? width - (width * 0.4) : width;
  //   }

  //   if ((orientation === PORTRAIT && imageOrientation === LANDSCAPE)) {
  //     return width + (width * 0.1);
  //   } else {
  //     return width - (width * 0.4);
  //   }
  // }

  get calculateImageWidth() {
    const { frame, width, device: { dimensions: { orientation } } } = this.props;

    const imageOrientation = this.imageOrientation;
    // const imageWidth;

    if (isTablet && Platform.OS === 'ios') {
      return width;
      // return frame ? width + 40 : width + 200
    }

    if ((orientation === PORTRAIT && imageOrientation === PORTRAIT) || (orientation === LANDSCAPE && imageOrientation === LANDSCAPE)) {
      return orientation === PORTRAIT ? width - (width * 0.4) : width;
    }

    if ((orientation === PORTRAIT && imageOrientation === LANDSCAPE)) {
      return width + (width * 0.1);
    } else {
      return width - (width * 0.4);
    }
  }

  get imageSize() {
    const { frame } = this.props;
    const { imageWidth, imageHeight } = this.state;

    const isIOS = Platform.OS === 'ios';

    // return {
    //   height: this.calculateImageHeight(imageWidth, imageHeight, isTablet ? width - (width * 0.2) : this.calculateImageWidth),
      // width: isTablet ? width - (width * 0.2) : this.calculateImageWidth
    // }

    return {
      height: this.calculateImageHeight(imageWidth, imageHeight, frame ? this.calculateImageWidth / 1.5 : this.calculateImageWidth),
      width: frame ? this.calculateImageWidth * 1.7 : this.calculateImageWidth
    }
  }

  render() {
    const { width, height, profileImage, treeBackground, style, frame } = this.props;

    const heightTree = height ? frame ? height - 50 : height - 80 : 180;
    const treeImage = profileImage ? { uri: profileImage } : { uri: 'tree_default' };

    return (
      <View style={style}>
        <TreeContainer width={width}
          source={{ uri: treeBackground }}
          resizeMode='stretch'
        >
          <ImageContainer width={width + 30}
            height={heightTree}>
            <Image
              style={{ ...this.imageSize, position: 'absolute', bottom: frame ? 17 : 0 }}
              source={treeImage}
              resizeMode='stretch'
            />
          </ImageContainer>
          {frame && <ProfileImage style={{ position: 'absolute' }} width={width}
            height={height ? height : 170}
            source={{ uri: frame }}
            resizeMode='stretch' />}
        </TreeContainer>
      </View>
    );
  }
}

TreeScreenShot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  treeBackground: PropTypes.any,
  profileImage: PropTypes.string,
};
