import React, { Component } from 'react';
import styled from 'styled-components/native';
import Welcome from './containers/Welcome';

class Scenes extends Component {
  render() {
    return (
      <WrapperScene>
        <Welcome />
      </WrapperScene>
    );
  }
}

const WrapperScene = styled.View`
  flex: 1;
`;

export default Scenes;
