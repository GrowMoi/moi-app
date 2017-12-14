import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../commons/utils';

const WIDTH = 40;
const widthImage = 83;
const heightImage = 75;

const ImageContainer = styled(TouchableOpacity)`
  margin-right: 5;
  margin-left: 5;
  margin-top: 5;
  margin-bottom: 5;
`;

const StyledImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(widthImage, heightImage, props.width)};
`;

const StyledText = styled(Text)`
  font-size: 10px;
  background-color: transparent;
`;


const LoginImage = ({ name, source, keyName, onPress, selected = false, selectedImage }) => {
  return (
    <ImageContainer onPress={ () => { if (onPress) { onPress(name, keyName); } }}>
      <StyledImage width={WIDTH} source={selected ? selectedImage : source} resizeMode='contain' />
      <StyledText>{name}</StyledText>
    </ImageContainer>
  );
};

LoginImage.propTypes = {
  name: PropTypes.string,
  source: PropTypes.any,
  keyName: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  selectedImage: PropTypes.any,
};

export default LoginImage;
