import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Home = () => (
  <WrapperScene>
    <TouchableOpacity>
      <Text onPress={Actions.pop}>Press Me!</Text>
    </TouchableOpacity>
  </WrapperScene>
);

const WrapperScene = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Home;
