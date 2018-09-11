import React, { Component } from 'react'
import { View, ImageBackground, Image } from 'react-native'
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import { Header } from '../Typography';
import woodBg from '../../../../assets/images/buttons/wood_texture.png';
import playButton from '../../../../assets/images/buttons/back_arrow.png';
import BackButton from '../SceneComponents/BackButton';

const Container = styled(View)`
`;

const Box = styled(ImageBackground)`
  background-color: #dbc788;
  position: relative;
  min-width: 100;
  max-width: 200;
  min-height: 40;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20;
  padding-vertical: 10;
  border-radius: 5;
  border-left-width: 3;
  border-left-color: #633427;
  border-bottom-width: 3;
  border-bottom-color: #633427;
`;

const TextContainer = styled(View)`
  flex-direction: row;
`;

const PlayContent = styled(Image)`
  width: 30;
`

const LabelContainer = Animatable.createAnimatableComponent(Container);


class WoodLabel extends Component {
  storeRef = ref => this.woodContainer = ref
  state = {
    showing: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showing: nextProps.appear });
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.showing) {
      this.woodContainer.fadeInLeft(250);
    }
  }

  render() {
    const { showing } = this.state;
    const { text = '', onPress = () => null, style } = this.props;

    return (
      <LabelContainer ref={this.storeRef} style={{ ...style }}>
        {showing && (
          <Box source={woodBg} resizeMode='cover'>
            <TextContainer>
              <Header bold numberOfLines={2}>{text}</Header>
              <BackButton reverse onPress={onPress}/>
            </TextContainer>
          </Box>
        )}
      </LabelContainer>
    );
  }

}


export default WoodLabel;
