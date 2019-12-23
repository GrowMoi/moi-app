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
  state = {
    size: null,
    prevSize: null,
  }

  componentDidMount() {
    // this.woodContainer.bounceInUp(400);
  }

  componentWillUnmount() {
    // this.woodContainer.bounceInDown(200);
    this.setState({ size: null })
  }

  render() {
    const { text = '', onPress = () => null, style } = this.props;
    const { size } = this.state
    const boxHeight = ((size || {}).height || 0)
    const minHeightLabel = 45
    const topPositionBox = boxHeight > minHeightLabel ? (boxHeight > 90 ? boxHeight/1.5 : boxHeight/2) : 0

    const fontSize = 10;
    const boxWidth = 80;
    const fontPositionTop = 0;
    const paddingHorizontal = 20;
    const paddingVertical = 15;

    return (
      <Container
        ref={this.storeRef}
        style={{...style, width: boxWidth, top: style.top - topPositionBox, opacity: (size || {}).height > 0 ? 1 : 0 }}
        onLayout={(event) => {
          let {x, y, width, height} = event.nativeEvent.layout;
          this.setState({ size: { x, y, width, height } })
        }}
      >
        <TouchableOpacity onPress={onPress}>
          {!!this.state.size && <Box
            source={{uri: 'wood_texture'}}
            resizeMode='stretch'
            paddingHorizontal={paddingHorizontal}
            paddingVertical={paddingVertical}
          >
            <TextContainer>
              <TextLabel
                customSize={fontSize}
                allowFontScaling
                style={{ top: fontPositionTop }}
              >{text}</TextLabel>
              {/* <BackButton reverse onPress={onPress}/> */}
            </TextContainer>
          </Box>}
        </TouchableOpacity>
      </Container>
    );
  }

}


export default WoodLabel;
