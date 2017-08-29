import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScreenOrientation, Icon } from 'expo';
import { Actions } from 'react-native-router-flux';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBar, Maceta } from '../../commons/components/SceneComponents';

const Content = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BottomContainer = styled(View)`
  position: relative;
`;

const BarContainer = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const MacetaContainer = styled(View)`
  position: absolute;
  align-items: center;
  height: 100;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ButtonMore = styled(Icon.Ionicons)`
  position: absolute;
  bottom: 15;
  right: 15;
  background-color: transparent;
`;

export default class Tree extends Component {
  componentDidMount() {
    ScreenOrientation.allow('ALL');
  }

  showOptions = () => {
    console.log('Press Options');
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
        <BottomContainer>
          <BarContainer><BottomBar/></BarContainer>
          <MacetaContainer><Maceta width={200}/></MacetaContainer>
          <TouchableOpacity onPress={this.showOptions}>
            <ButtonMore name="ios-more" size={45} />
          </TouchableOpacity>
        </BottomContainer>
      </MoiBackground>
    );
  }
}

Tree.propTypes = {
  title: PropTypes.string,
};
