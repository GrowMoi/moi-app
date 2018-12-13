import React, { PureComponent } from 'react'
import { View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import { Header } from '../Typography';
import woodBg from '../../../../assets/images/buttons/wood_texture.png';
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
`;

const PlayContent = styled(Image)`
  width: 30;
`

const TextLabel = styled(Header)`

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

  get fontSize() {
    const { zoomScale, zoomInfo } = this.props;

    switch(zoomScale) {
      case 1:
        return 16;
      case 2:
        return 14;
      case 3:
        return 10 + ((zoomInfo.scale -1) * 7);
      case 4:
        return 9 * zoomInfo.scale;
      default:
        return null;
    }
  }

  get labelSize() {
    const { zoomScale, zoomInfo } = this.props;

    switch (zoomScale) {
      case 1, 2:
        return { fontHeight: 40, width: 200 };
      case 3:
        return {
          height: 21 * zoomInfo.scale,
          width: 80 + ((zoomInfo.scale -1) * 30),
          paddingHorizontal: 1,
          paddingVertical: 10 * zoomInfo.scale,
          fontHeight: 15 * zoomInfo.scale,
          fontPositionTop: 0,
        };
      case 4:
        return {
          height: (22 * zoomInfo.scale),
          width: 80 + ((zoomInfo.scale -1) * 30),
          paddingHorizontal: 1,
          paddingVertical: 10 * zoomInfo.scale,
          fontHeight: 15 * zoomInfo.scale,
          fontPositionTop: 0,
        };
      default:
        return  {};
    }
  }

  get zoomScaleStyles() {
    const {zoomScale, zoomInfo } = this.props;

     switch(zoomScale) {
      case 1:
        return {
          transform: [{translate: [-54, -33, 1]}],
          width: null,
        };
      case 2:
        return {};
      case 3:
        return {
          height: this.labelSize.height,
          width: this.labelSize.width,
          transform: [{translate: [-40 -  (15 * (zoomInfo.scale -1)), -30 - (20 * (zoomInfo.scale -1)), 1]}],
        };
      case 4:
        return  {
          height: this.labelSize.height,
          width: this.labelSize.width,
          transform: [{translate: [-40 -  (15 * (zoomInfo.scale -1)), -30 - (20 * (zoomInfo.scale -1)), 1]}],
        };
      default:
        return null;
    }
  }

  render() {
    const { text = '', onPress = () => null, style, zoomScale, zoomInfo } = this.props;

    return (
      <Container ref={this.storeRef} style={{...this.zoomScaleStyles, ...style}}>
        <TouchableOpacity onPress={onPress}>
          <Box
            height={this.zoomScaleStyles.height}
            width={this.zoomScaleStyles.width}
              source={woodBg}
              resizeMode='contain'
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
