import React, { Component } from 'react';
import { TouchableOpacity, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Container = styled(TouchableOpacity)`
  position: absolute;
  top: 0;
  right: 0;
  width: 35;
  height: 35;
  zIndex: 1;
`;


const Icon = styled(ImageBackground)`
  width: 35;
  height: 35;
  zIndex: 1;
`;

// const Icon = styled(Ionicons)`
//   position: absolute;
//   top: 2;
//   right: 6;
//   zIndex: 1;
//   font-weight: 900;
// `;

export default class CloseIcon extends Component {
  render() {
    const { onPress } = this.props;

    return (
      <Container
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Icon
          onPress={this.removeResultFinalTest}
          source={{ uri: 'boton_salir_h' }}
          // style={style}
          resizeMode='stretch' />
        {/* <Icon name='md-close'
          color='white'
          size={18}
        /> */}
      </Container>
    );
  }
};
