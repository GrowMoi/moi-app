import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../commons/utils';

const WIDTH = 40;
const widthImage = 83;
const heightImage = 75;

const ImageContainer = styled(TouchableOpacity)`
  margin-right: 7;
  margin-left: 5;
  margin-top: 5;
  margin-bottom: 5;
`;

const StyledImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(widthImage, heightImage, props.width)};
`;
const AnimatableImage = Animatable.createAnimatableComponent(StyledImage);

const StyledText = styled(Text)`
  font-size: 10px;
  background-color: transparent;
`;

class LoginImage extends Component {
  handleImageRef = ref => this.image = ref;

  onPressImage = () => {
    const { onPress, name, keyName } = this.props;

    if (onPress) {
      this.image.pulse(400);
      onPress(name, keyName);
    }
  }

  render() {
    const { name, source, selected = false, selectedImage } = this.props;

    return (
      <ImageContainer
        onPress={ this.onPressImage }
        activeOpacity={1}
      >
        <AnimatableImage
          ref={this.handleImageRef}
          width={WIDTH}
          source={selected ? selectedImage : source}
          resizeMode='contain'
        />
        <StyledText>{name}</StyledText>
      </ImageContainer>
    );
  }
}

LoginImage.propTypes = {
  name: PropTypes.string,
  source: PropTypes.any,
  keyName: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  selectedImage: PropTypes.any,
};

export default LoginImage;
