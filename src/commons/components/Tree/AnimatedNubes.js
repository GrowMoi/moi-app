import React, { Component } from 'react';
import { View } from 'react-native';
import { AnimatedImage } from './AnimatedImage';
import uuid from 'uuid/v4';

import nube1L from '../../../../assets/images/nubes/nube1L.png';
import nube2L from '../../../../assets/images/nubes/nube2L.png';
import nube3L from '../../../../assets/images/nubes/nube3L.png';

const nubesList = [nube1L, nube2L, nube3L];
const delayStartRange = [0, 4000];
const positionNube = [{
  position: 'left',
  flexPosition: 'flex-start'
}, {
  position: 'right',
  flexPosition: 'flex-end'
}];

export class AnimatedNubes extends Component {
  getRandomTopPostion = () => {
    const { deviceHeight, orientation } = this.props;

    const minValue = 0;
    const maxValue = orientation === 'LANDSCAPE' ? 15 : 30;

    const randomPercentage = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    return (deviceHeight * randomPercentage) / 100;
  }

  getNubesArray() {
    return nubesList.sort((a, b) => {
      return 0.5 - Math.random();
    });
  }

  getDelayStart() {
    return Math.random() * (delayStartRange[1] - delayStartRange[0]) + delayStartRange[0];
  }

  getNubesData() {
    return this.getNubesArray().map(
      nube => {
        return {
          source: nube,
          delayStart: this.getDelayStart(),
          verticalPosition: this.getRandomTopPostion(),
          horizontalPosition: this.getNubePosition(),
        }
      }
    );
  }

  getAnimationValues() {
    return {
      minValue: 0,
      maxValue: this.getWidthContainerNube(),
    }
  }

  getWidthContainerNube() {
    return this.props.deviceWidth + (this.props.deviceWidth * 0.7);
  }

  getNubePosition() {
    return positionNube[Math.floor(Math.random()*positionNube.length)];
  }

  render() {
    const { orientation } = this.props;

    const constainerStyle = {
      position: "relative",
      flex: 1,
      left: -130,
      width: this.getWidthContainerNube(),
      flexDirection: 'column',
    };
    const animationValues = this.getAnimationValues();
    const isLandscape = orientation === 'LANDSCAPE';

    return (
      <View style={constainerStyle}>
        {this.getNubesData().map(
          (nube, i) =>
            <AnimatedImage
              key={uuid()}
              source={nube.source}
              minValue={animationValues.minValue}
              maxValue={animationValues.maxValue}
              timeRange={isLandscape ? [25000, 40000] : [15000, 30000]}
              delayStart={nube.delayStart}
              verticalPosition={this.getRandomTopPostion}
              horizontalPosition={this.getNubePosition}
              infiniteLoop
            />
        )}
      </View>
    );
  }
}