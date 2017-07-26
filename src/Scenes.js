import React, { Component } from 'react';
import styled from 'styled-components/native';

class Scenes extends Component {
  render() {
    return (
      <WrapperScene>
        <Title>Welcome to Moi app!</Title>
      </WrapperScene>
    );
  }
}

/**
 * Styled components that use in this Scene
 */

const WrapperScene = styled.View`
  background-color: #FFB658;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 25;
  font-weight: bold;
`;

export default Scenes;
