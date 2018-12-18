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
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-top: 40;
`;

const BottomBar = styled(TreeBottom)`
  position: relative;
  z-index: 0;
`

const Background = styled(MoiBackground)`
  position: relative;
`

const TopNavbar = styled(Navbar)`
  position: relative;
  z-index: 2;
`

export default class TreeScene extends Component {
  render() {
    return (
      <Background>
        <ContentScreen>
          <Tree />
        </ContentScreen>
        <TopNavbar/>
        <BottomBar />
      </Background>
    );
  }
}

TreeScene.propTypes = {
  title: PropTypes.string,
};
