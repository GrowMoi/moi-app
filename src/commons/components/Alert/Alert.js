import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, Modal } from 'react-native'
import styled from 'styled-components/native'
// import Modal from 'expo/src/modal/Modal';
import { Palette } from '../../styles';
import Ionicons from '@expo/vector-icons/Ionicons';

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
      <Modal
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
      </Modal>
    );
  }
};
