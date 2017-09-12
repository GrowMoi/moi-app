import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBar, BackButton, BackButtonContainer } from '../../commons/components/SceneComponents';
import { ContentBox } from '../../commons/components/ContentComponents';

export default class SingleContentScene extends Component {
  render() {
    return (
      <MoiBackground>
        <ContentBox>
          <View>
            <Text>
              Component
            </Text>
          </View>
        </ContentBox>
        <BackButtonContainer>
          <BackButton onPress={() => Actions.content()}/>
        </BackButtonContainer>
        <Navbar/>
        <BottomBar />
      </MoiBackground>
    );
  }
}

SingleContentScene.propTypes = {
  title: PropTypes.string,
};