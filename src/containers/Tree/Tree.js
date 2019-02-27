import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ScreenOrientation } from 'expo';
import { View, Keyboard } from 'react-native';
import UserInactivity from 'react-native-user-inactivity';
import { Actions } from 'react-native-router-flux'

// Components
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import TreeBottom from './components/TreeBottom';
import Tree from '../../commons/components/Tree';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert';
import { connect } from 'react-redux';

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
@connect(state => ({
  scene: state.routes.scene,
}))
export default class TreeScene extends Component {
  state = {
    isOpenPassiveMessage: false,
  }

  currentScene = '';
  prevScene = '';

  render() {
    const { isOpenPassiveMessage } = this.state
    const { scene } = this.props
    const backScenes = ['profile'];

    if(scene.name !== 'moiDrawer') {
      if(scene.name === 'tree') {
        this.prevScene = scene.name;
      }
      this.currentScene = scene.name;
    } else if (backScenes.indexOf(this.currentScene) !== -1){
      this.currentScene = this.prevScene;
    }

    return (
      <UserInactivity
        timeForInactivity={6000}
        onAction={(isActive) => {
          if(!isActive && this.currentScene === 'tree') {
            Keyboard.dismiss()
            this.setState({ isOpenPassiveMessage: !isActive })
          }
        }}
      >
        <Background>
          <ContentScreen>
            <Tree />
          </ContentScreen>
          <TopNavbar/>
          <BottomBar />

          <PassiveMessageAlert
            isOpenPassiveMessage={isOpenPassiveMessage}
            touchableProps={{
              onPress: () => {
                this.setState(prevState => ({ isOpenPassiveMessage: !prevState.isOpenPassiveMessage }))
              }
            }}
            message='El mundo del conocimiento espera por ti. Da clic en un fruto gris para conocer sus contenidos'
          />
        </Background>
      </UserInactivity>
    );
  }
}

TreeScene.propTypes = {
  title: PropTypes.string,
};
