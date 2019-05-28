import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size } from './../styles';
import { getHeightAspectRatio } from './../utils';

const widthFrame = 377;
const heightFrame = 806;

const StyledWoodFrame = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => props.height ? props.height : getHeightAspectRatio(widthFrame, heightFrame, props.width)};
  padding-horizontal: 20;
  padding-vertical: 30;
  border-radius: 10;
`;

const WoodFrame = ({ width = widthFrame, height, ...rest }) => (
  <StyledWoodFrame width={width} height={height} source={{uri: 'wood_frame'}} resizeMode='stretch' {...rest} />
)

export default WoodFrame;
