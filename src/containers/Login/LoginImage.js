import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const ImageContainer = styled(TouchableOpacity)`
  margin-right: 5;
  margin-left: 5;
  margin-top: 5;
  margin-bottom: 5;
  width: ${props => props.width};
`;


const StyledImage = styled(Image)`
`;

const StyledText = styled(Text)`
  font-size: 10px;
  background-color: transparent;
`;

const WIDTH = 55;

const LoginImage = ({ name, source, keyName, onPress, selected = false }) => {
  return (
    <ImageContainer width={WIDTH} onPress={ () => { if (onPress) { onPress(name, keyName); } }}>
      <StyledImage source={source} resizeMode='contain' />
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
};

export default LoginImage;
