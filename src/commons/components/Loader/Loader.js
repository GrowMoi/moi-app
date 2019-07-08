import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Orientation from 'react-native-orientation';
import { getHeightAspectRatio } from '../../utils';
import AnimatedTree from './AminatedTree';
import ProgressBar from './ProgressBar';
import size from '../../styles/size';
import deviceUtils from '../../utils/device-utils';

const isTablet = deviceUtils.isTablet();

const Background = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const widtgLogo = 626;
const heightLogo = 291;
const LogoMoi = styled(Image)`
  width: ${props => props.width};
  height: ${ props => getHeightAspectRatio(widtgLogo, heightLogo, props.width)};
  position: absolute;
  top: ${props => props.topPosition};
`;

const TextContainer = styled(View)`
  width: ${props => props.width};
  height: 40;
  position: absolute;
  top: ${props => props.topPosition};
  align-items: center;
`;

export default class Loader extends Component {
  screenWidth;
  screenHeight;

  getMinSize = () => this.screenWidth < this.screenHeight ? this.screenWidth - (this.screenWidth * 0.05) : this.screenHeight;
  isLandscape = () => this.screenWidth > this.screenHeight;

  componentWillMount() {
    Orientation.lockToPortrait();
    // this.setState({ showDefaultSpash: false });
    this.props.onInit();
  }

  getPositionBasedOnPercent(percent) {
    const inversePercent = 100 - percent;
    const sizeToRest = this.screenHeight * (inversePercent / 100)
    return this.screenHeight - sizeToRest;
  }

  get widthLogo() {
    const sizeElements = this.getMinSize();
    // const percentToReduce = this.isLandscape() ? 0.7  : 0.3
    const percentToReduce = isTablet ? 0.55 : 0.3;
    return sizeElements - (sizeElements * percentToReduce);
  }

  get widthProgressBar() {
    const sizeElements = this.getMinSize();
    const percentToReduce = this.isLandscape() ? 0.2 : 0
    return sizeElements - (sizeElements * percentToReduce);
  }

  get topPositionText() {
    return this.isLandscape() ? this.getPositionBasedOnPercent(85) : this.getPositionBasedOnPercent(93);
  }

  getScreenValues() {
    this.screenWidth = Math.round(Dimensions.get('window').width);
    this.screenHeight = Math.round(Dimensions.get('window').height);
  }

  render() {
    this.getScreenValues();

    return (
      <Background source={{ uri: 'splash' }} resizeMode='stretch'>
        <Background source={{ uri: 'fondo_blanco' }} resizeMode='stretch'>
          <AnimatedTree width={this.getMinSize()} isLandscape={this.isLandscape()} generateTopPosition={this.getPositionBasedOnPercent} />
          <LogoMoi source={{ uri: 'logo_moi' }} resizeMode='stretch' width={this.widthLogo} topPosition={this.getPositionBasedOnPercent(78)} />
          <TextContainer width={this.widthProgressBar} topPosition={this.topPositionText}>
            <Text style={{ fontSize: size.fontSizeLoginImage, color: '#30225E' }}>
              {/* change text */}
              {/* If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. */}
              © copyright moi, 2019
            </Text>
          </TextContainer>
          <ProgressBar width={this.widthProgressBar} {...this.props} />
        </Background>
      </Background>
    );
  }
}