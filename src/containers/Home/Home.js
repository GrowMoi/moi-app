import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
// import { ScreenOrientation } from 'expo';
import { Actions } from 'react-native-router-flux';
import Navbar from '../../commons/components/Navbar/Navbar';

export default class Home extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <WrapperScene>
        <Navbar />
        <TouchableOpacity>
          <Text color='white' onPress={Actions.pop}>Press Me!</Text>
        </TouchableOpacity>
      </WrapperScene>
    );
  }
}

const WrapperScene = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;
