import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { Palette } from '../../styles';
import backArrow from '../../../../assets/images/buttons/back_arrow.png';

const ButtonContainer = styled(View)`
  position: relative;
  background-color: #7f8331;
  bottom: 50;
  justify-content: center;
  align-items: center;
  width: 50;
  height: 50;
  border-radius: 5;
  border-color: transparent;
  border-bottom-color: ${Palette.dark.alpha(0.4).css()};
  border-left-color: ${Palette.dark.alpha(0.4).css()};
  border-width: 3;
  shadow-color: ${Palette.dark};
  shadow-opacity: 0.5;
  shadow-offset: -5px 5px;
  shadow-radius: 2;
`;

const BackImage = styled(Image)`
  width: 45;
  height: 45;
  right: 5;
`;

export default class BackButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.onPressButton} {...this.props}>
        <ButtonContainer>
          <BackImage source={backArrow} resizeMode='contain' />
        </ButtonContainer>
      </TouchableOpacity>
    );
  }
}
