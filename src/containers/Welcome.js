import React, { Component } from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo';

class Welcome extends Component {
  render() {
    return (
      <Gradient colors={['#5FE89F', '#5EDFA7', '#66CDF7']}
        start={[0.1, 0.1]}
        end={[1, 1]}>
        <Title color='white'>Welcome to Moi app!</Title>
        <SimpleText>This is a first component</SimpleText>
      </Gradient>
    );
  }
}

/**
 * Styled components that use in this Scene
 */

const Title = styled.Text`
  color: ${({ color }) => color && color};
  font-size: 25;
  font-weight: bold;
  background-color: transparent;
`;

const SimpleText = styled.Text`
  background-color: transparent;
  font-weight: bold;
`;

const Gradient = styled(LinearGradient)`
  flex: 1;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;

export default Welcome;
