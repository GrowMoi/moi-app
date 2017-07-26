import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

class Scenes extends Component {
  render() {
    return (
      <WrapperScene>
        <Title color='white'>Welcome to Moi app!</Title>
        <Text>This is a first component</Text>
      </WrapperScene>
    );
  }
}

/**
 * Styled components that use in this Scene
 */

const WrapperScene = styled.View`
  background-color: #ffb658;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${({ color }) => color && color};
  font-size: 25;
  font-weight: bold;
`;

export default Scenes;
