import React, { PureComponent } from 'react'
import { View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import { Header } from '../Typography';
import woodBg from '../../../../assets/images/buttons/wood_texture.png';
import BackButton from '../SceneComponents/BackButton';

const Container = styled(View)`
`;

const Box = styled(ImageBackground)`
  background-color: #dbc788;
  position: relative;
  width: ${props => {
    if(props.width) {
      return props.width;
    }
    return 180;
  }};
  min-height: ${props => props.height || 40};
  justify-content: center;
  align-items: center;
  padding-horizontal: ${props => {
    if(props.paddingHorizontal) {
      return props.paddingHorizontal;
    }
    return 20;
  }};
  padding-vertical: ${props => {
    if(props.paddingVertical) {
      return props.paddingVertical
    }
    return 10;
  }};
  border-radius: 10;
  overflow: hidden;
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
    // this.woodContainer.bounceInUp(400);
  }

  componentWillUnmount() {
    // this.woodContainer.bounceInDown(200);
  }

  get fontSize() {
    const { zoomScale } = this.props;

    switch(zoomScale) {
      case 1, 2, 3:
        return null;
      case 4:
        return 10;
      default:
        return null;
    }
  }

  get labelSize() {
    const { zoomScale } = this.props;

    switch (zoomScale) {
      case 1, 2, 3:
        return { fontHeight: 40, width: 200 };
      case 4:
        return {
          height: 5,
          width: 80,
          paddingHorizontal: 1,
          paddingVertical: 7,
          fontHeight: 10,
          fontPositionTop: -6,
        };
      default:
        return  {};
    }
  }

  render() {
    const { text = '', onPress = () => null, style, zoomScale } = this.props;

    console.log(zoomScale);
    const zoomScaleStyles = zoomScale === 4 ? {
      height: this.labelSize.height,
      width: this.labelSize.width,
      transform: [{translate: [-35, -13, 1]}],
    } : {};

    return (
      <Container ref={this.storeRef} style={{...zoomScaleStyles, ...style}}>
        <TouchableOpacity onPress={onPress}>
          <Box
            height={zoomScaleStyles.height}
            width={zoomScaleStyles.width}
              source={woodBg}
              resizeMode='cover'
              paddingHorizontal={this.labelSize.paddingHorizontal}
              paddingVertical={this.labelSize.paddingVertical}
            >
            <TextContainer>
              <TextLabel
                customSize={this.fontSize}
                allowFontScaling
                style={{ height: this.labelSize.fontHeight, top: this.labelSize.fontPositionTop }}
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
