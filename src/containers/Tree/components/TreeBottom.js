import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { BottomBar } from '../../../commons/components/SceneComponents';

const BottomContainer = styled(View)`
  position: relative;
`;

const BarContainer = styled(View)`
  position: absolute;
  bottom: 0;
  height: 16;
  left: 0;
  right: 0;
`;

export default class TreeBottom extends Component {
  state = {
    optionsAreVisible: false,
  }

  showOptions = () => {
    this.setState({ optionsAreVisible: true });
  }

  hideOptions = () => {
    this.setState({ optionsAreVisible: false });
  }

  render() {
    return (
      <BottomContainer>
        <BarContainer><BottomBar/></BarContainer>
      </BottomContainer>
    );
  }
}
