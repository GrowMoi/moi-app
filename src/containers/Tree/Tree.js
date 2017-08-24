import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
// import { ScreenOrientation } from 'expo';
import { Actions } from 'react-native-router-flux';
import Navbar from '../../commons/components/Navbar/Navbar';

const WrapperScene = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default class Tree extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  toggle

  render() {
    return (
      <WrapperScene>
        <Navbar />
        <TouchableOpacity>
          <Text color='white' onPress={() => Actions.refresh({ key: 'moiDrawer', open: value => !value })}>Press Me!</Text>
        </TouchableOpacity>
      </WrapperScene>
    );
  }
}

Tree.propTypes = {
  title: PropTypes.string,
};
