import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';

const WrapperScene = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default class Tree extends Component {
  render() {
    console.log('Render TREE');
    return (
      <WrapperScene>
        <MoiBackground>
          <Navbar />
          <TouchableOpacity>
            <Text color='white' onPress={() => Actions.refresh({ key: 'moiDrawer', open: value => !value })}>Press Me!</Text>
          </TouchableOpacity>
        </MoiBackground>
      </WrapperScene>
    );
  }
}

Tree.propTypes = {
  title: PropTypes.string,
};
