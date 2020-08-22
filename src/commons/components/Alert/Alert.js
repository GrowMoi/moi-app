import React, { Component } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { Palette } from '../../styles';
import MoiModal from '../../../containers/Modal/MoiModal';

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.noOverlay ? 'transparent' : Palette.black.alpha(0.7).css()};
`;

export default class Alert extends Component {
  state = {
    isVisible: false,
  }

  render() {
    const { open, children, touchableProps = {}, animationType='slide', noOverlay=false } = this.props;

    return (
      <MoiModal
        visible={open}
        transparent
        supportedOrientations={['portrait']}
        animationType={animationType}
        hardwareAccelerated
      >
      <TouchableWithoutFeedback {...touchableProps}>
        <Overlay noOverlay={noOverlay}>
          {children}
        </Overlay>
      </TouchableWithoutFeedback>
      </MoiModal>
    );
  }
};
