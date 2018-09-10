import React, { Component } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import Modal from 'expo/src/modal/Modal';
import { Palette } from '../../styles';
import Ionicons from '@expo/vector-icons/Ionicons';

const Container = styled(View)`
  flex: 1;
  background-color: rgba(0,0,0,0);
`;

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Palette.black.alpha(0.7).css()};
`;

const CloseIcon = styled(Ionicons)`
  position: absolute;
  top: 20;
  right: 20;
  zIndex: 1;
  background-color: transparent;
`;

export default class Alert extends Component {
  state = {
    isVisible: false,
  }

  render() {
    const { open, children } = this.props;

    return (
      <Container>
        <Modal
          visible={open}
          transparent
          supportedOrientations={['portrait']}
          animationType='slide'
          hardwareAccelerated
        >
          <Overlay>
            {children}
          </Overlay>
        </Modal>
      </Container>
    );
  }
};