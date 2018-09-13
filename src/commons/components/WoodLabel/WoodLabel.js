import React, { PureComponent } from 'react'
import { View, ImageBackground, Image, Text } from 'react-native'
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
  min-width: 120;
  max-width: 200;
  min-height: ${props => props.height || 40};
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

const TextLabel = styled(Header)`

`;

const LabelContainer = Animatable.createAnimatableComponent(Container);

const DownArrow = styled(View)`
  border-right-width: 5;
  border-right-color: transparent;
  border-bottom-width: 8;
  border-bottom-color: transparent;
  border-top-width: 8;
  border-top-color: #633427;
  border-left-width: 5;
  border-left-color: transparent;
  position: absolute;
  bottom: -18;
`;

class WoodLabel extends PureComponent {
  storeRef = ref => this.woodContainer = ref

  componentDidMount() {
    this.woodContainer.bounceInUp(400);
  }

  componentWillUnmount() {
    this.woodContainer.bounceInDown(200);
  }

  render() {
    const { text = '', onPress = () => null, style, size } = this.props;

    return (
      <LabelContainer ref={this.storeRef} style={style}>
        <Box height={size} source={woodBg} resizeMode='cover'>
          <TextContainer>
            <TextLabel
              adjustsFontSizeToFit
              numberOfLines={2}>{text}</TextLabel>
            <BackButton reverse onPress={onPress}/>
          </TextContainer>
          <DownArrow />
        </Box>
      </LabelContainer>
    );
  }

}


export default WoodLabel;
