import React, { PureComponent } from 'react'
import { View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import { Header } from '../Typography';
import BackButton from '../SceneComponents/BackButton';

const Container = styled(View)`
`;

const Box = styled(ImageBackground)`
  position: relative;
  width: ${props => {
    if(props.width) {
      return props.width;
    }
    return 100;
  }};
  min-height: ${props => props.height || 40};
  justify-content: center;
  align-items: center;

  padding-vertical: ${props => {
    if(props.paddingVertical) {
      return props.paddingVertical
    }
    return 10;
  }};
  overflow: hidden;
`;

const TextContainer = styled(View)`
  flex-direction: row;
  padding-horizontal: 10%;
`;

const PlayContent = styled(Image)`
  width: 30;
`

const TextLabel = styled(Header)`
  font-weight: 900;
`;

const LabelContainer = Animatable.createAnimatableComponent(Container);

class WoodLabel extends PureComponent {
  storeRef = ref => this.woodContainer = ref

  componentDidMount() {
    // this.woodContainer.bounceInUp(400);
  }

  componentWillUnmount() {
    // this.woodContainer.bounceInDown(200);
  }

  render() {
    const { text = '', onPress = () => null, style } = this.props;

    const fontSize = 10;
    const boxHeight = 33;
    const boxWidth = 80;
    const fontHeight = 15;
    const fontPositionTop = 0;
    const paddingHorizontal = 1;
    const paddingVertical = 10;

    return (
      <Container ref={this.storeRef} style={{...style, height: boxHeight, width: boxWidth}}>
        <TouchableOpacity onPress={onPress}>
          <Box
              height={boxHeight}
              width={boxWidth}
              source={{uri: 'wood_texture'}}
              resizeMode='contain'
              paddingHorizontal={paddingHorizontal}
              paddingVertical={paddingVertical}
            >
            <TextContainer>
              <TextLabel
                customSize={fontSize}
                allowFontScaling
                style={{ height: fontHeight, top: fontPositionTop }}
                numberOfLines={1}>{text}</TextLabel>
              {/* <BackButton reverse onPress={onPress}/> */}
            </TextContainer>
          </Box>
        </TouchableOpacity>
      </Container>
    );
  }

}


export default WoodLabel;
