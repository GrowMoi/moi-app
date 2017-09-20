import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import backArrow from '../../../../assets/images/buttons/back_arrow.png';

const ButtonContainer = styled(View)`
  position: relative;
  justify-content: center;
  align-items: center;
`;

const BackImage = styled(Image)`
  width: 30;
  height: 30;
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
