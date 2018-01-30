import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ScreenOrientation } from 'expo';
import { View } from 'react-native';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import TreeBottom from './components/TreeBottom';
import Tree from '../../commons/components/Tree';

const ContentScreen = styled(View)`
  flex: 1;
`;

export default class TreeScene extends Component {
  render() {
    return (
      <MoiBackground>
        <ContentScreen>
          <Tree />
        </ContentScreen>
        <Navbar/>
        <TreeBottom />
      </MoiBackground>
    );
  }
}

Tree.propTypes = {
  title: PropTypes.string,
};
