import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScreenOrientation } from 'expo';
import { Actions } from 'react-native-router-flux';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import TreeBottom from './components/TreeBottom';

const Content = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default class Tree extends Component {
  componentDidMount() {
    ScreenOrientation.allow('ALL');
  }

  render() {
    return (
      <MoiBackground>
        <Navbar/>
        <Content>
          <TouchableOpacity>
            <Text
              color='white'
              onPress={() => Actions.refresh({ key: 'moiDrawer', open: value => !value })}
            >
              Contenido
            </Text>
          </TouchableOpacity>
        </Content>
        <TreeBottom />
      </MoiBackground>
    );
  }
}

Tree.propTypes = {
  title: PropTypes.string,
};
