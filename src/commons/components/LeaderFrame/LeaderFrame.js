import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';

const widthFrame = 375;
const heightFrame = 667;

const StyledLeaderFrame = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(widthFrame, heightFrame, props.width)};
  padding-horizontal: 20;
  padding-vertical: 40;
  border-radius: 10;
  justify-content: center;
  align-items: center;
`;

const LeaderFrame = ({ width = widthFrame, ...rest }) => (
  <StyledLeaderFrame width={width} source={{uri: 'leaderboard_frame'}} resizeMode='contain' {...rest} />
)

export default LeaderFrame;
