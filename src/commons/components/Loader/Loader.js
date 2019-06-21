import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Image, Text, View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';
import AnimatedTree from './AminatedTree';
import ProgressBar from './ProgressBar';
// import loadingGif from './assets/images/spiner-moi.gif';

const width = 873;
const height = 1146;
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const getMinSize = () => screenWidth < screenHeight ? screenWidth - (screenWidth * 0.05) : screenHeight;
const isLandscape = () => screenWidth > screenHeight;


const Background = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  padding: 20px;
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

  getPositionBasedOnPercent(percent) {
    const inversePercent = 100 - percent;
    const sizeToRest = screenHeight * (inversePercent / 100)
    // Math.trunc
    return screenHeight - sizeToRest;
  }

  get widthLogo() {
    const sizeElements = getMinSize();
    const percentToReduce = isLandscape() ? 0.7  : 0.3
    return sizeElements - (sizeElements * percentToReduce);
  }

  get widthProgressBar() {
    const sizeElements = getMinSize();
    const percentToReduce = isLandscape() ? 0.4  : 0
    return sizeElements - (sizeElements * percentToReduce);
  }

  render() {
    // const topTree = this.getPositionBasedOnPercent(5.3);
    // console.log("TCL: Loader -> render -> topTree", topTree)

    // const sizeElements = getMinSize();
    // const widthLogo = sizeElements - (sizeElements * 0.3);

    return (
      <Background source={{ uri: 'splash' }} resizeMode='stretch'>
        <AnimatedTree width={getMinSize()} isLandscape={isLandscape()} generateTopPosition={this.getPositionBasedOnPercent} />
        <LogoMoi source={{ uri: 'logo_moi' }} resizeMode='stretch' width={this.widthLogo} topPosition={this.getPositionBasedOnPercent(70)} />
        <TextContainer width={this.widthProgressBar} topPosition={this.getPositionBasedOnPercent(85)}>
          <Text>some text</Text>
        </TextContainer>

        <ProgressBar width={this.widthProgressBar} {...this.props} />
      </Background>
    );
  }
}

// ContentListScene.propTypes = {
//   title: PropTypes.string,
//   neuronSelected: PropTypes.object,
//   neuron_id: PropTypes.number,
//   device: PropTypes.object,
// };
