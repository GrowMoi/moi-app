import React, { Component } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size } from '../../styles';
import { getHeightAspectRatio } from '../../utils';
import leaderFrame from '../../../../assets/images/frames/leaderboard_frame.png';

const widthFrame = 375;
const heightFrame = 667;

const StyledLeaderFrame = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(widthFrame, heightFrame, props.width)};
  padding-horizontal: 20;
  padding-vertical: 30;
  border-radius: 10;
`;

const LeaderFrame = ({ width = widthFrame, ...rest }) => (
  <StyledLeaderFrame width={width} source={leaderFrame} resizeMode='contain' {...rest} />
)

export default LeaderFrame;
