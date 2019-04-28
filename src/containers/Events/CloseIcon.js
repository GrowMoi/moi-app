import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Container = styled(TouchableOpacity)`
  position: absolute;
  top: 0;
  right: 0;
  width: 25;
  height: 25;
  zIndex: 1;
  background-color: #D69F2B;
  border-radius: 35;
  border: 1px #E3BB83;
`;

const Icon = styled(Ionicons)`
  position: absolute;
  top: 2;
  right: 6;
  zIndex: 1;
  font-weight: 900;
`;

export default class CloseIcon extends Component {
  render() {
    const { onPress } = this.props;

    return (
      <Container
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Icon name='md-close'
          color='white'
          size={18}
        />
      </Container>
    );
  }
};
