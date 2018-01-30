import React, { Component } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size } from './../styles';
import { getHeightAspectRatio } from './../utils';
import woodFrame from './../../../assets/images/frames/wood_frame.png';

const widthFrame = 377;
const heightFrame = 806;

const StyledWoodFrame = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(widthFrame, heightFrame, props.width)};
  padding-horizontal: 20;
  padding-vertical: 30;
  border-radius: 10;
`;

const WoodFrame = ({ width = widthFrame, ...rest }) => (
  <StyledWoodFrame width={width} source={woodFrame} resizeMode='contain' {...rest} />
)

export default WoodFrame;
