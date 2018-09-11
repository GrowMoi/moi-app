import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import backArrow from '../../../../assets/images/buttons/back_arrow.png';
import * as Animatable from 'react-native-animatable';

const ButtonContainer = styled(View)`
  position: relative;
  justify-content: center;
  align-items: center;
`;

const BackImage = styled(Image)`
  width: 30;
  height: 30;
`;

const ButtonContainerAnimated = Animatable.createAnimatableComponent(ButtonContainer);

export default class BackButton extends Component {
  handleViewRef = ref => this.backButton = ref;

  onPressButton = () => {
    const { onPress } = this.props
    if(onPress) {
      this.backButton.pulse(250)
        .then(endState => onPress())
    }
  }

  render() {
    const { reverse } = this.props;
    const reverseStyles = reverse ? { transform: [{ rotate: '180deg' }, { rotateX: '180deg' }] } : {};

    return (
      <TouchableWithoutFeedback {...this.props} onPress={this.onPressButton}>
        <ButtonContainerAnimated ref={this.handleViewRef}>
          <BackImage style={{ ...reverseStyles }} source={backArrow} resizeMode='contain' />
        </ButtonContainerAnimated>
      </TouchableWithoutFeedback>
    );
  }
}
