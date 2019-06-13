import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { Size } from '../../styles';

const ButtonContainer = styled(View)`
  position: relative;
  justify-content: center;
  align-items: center;
  padding-top: 7px;
`;

const BackImage = styled(Image)`
  width: ${Size.hamburgerSize};
  height: ${Size.hamburgerSize};
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
          <BackImage style={{ ...reverseStyles }} source={{uri: 'back_arrow'}} resizeMode='contain' />
        </ButtonContainerAnimated>
      </TouchableWithoutFeedback>
    );
  }
}
