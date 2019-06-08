import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Palette } from '../../styles';
import { Header, TextBody } from '../Typography';
import MoIcon from '../MoIcon/MoIcon';

const Container = styled(TouchableOpacity)`
  flex: 1;
  height: 40;
  background-color: ${Palette.white.alpha(0.4).css()};
  align-self: stretch;
  margin-horizontal: 10;
  margin-vertical: 5;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10;
  padding-vertical: 10;
  border-radius: 5;
  shadow-color: ${Palette.dark};
  shadow-opacity: 0.5;
  shadow-offset: -5px 5px;
  shadow-radius: 2;
`;

const Icon = styled(MoIcon)`
  flex-grow: 0;
  margin-right: 10;
`

const PlayerName = styled(Header)`
  flex: 1.5;
`

const Grade = styled(TextBody)`
  flex: 1;
`;

const Seconds = styled(TextBody)`
  width: 35;
`;

const LeaderRow = ({ playerName, grade, seconds, style, onPress = () => null }) => {
  return (
    <Container style={style} onPress={onPress}>
      <Icon name='profile' size={30}/>
      <PlayerName numberOfLines={1} inverted heavy>{playerName}</PlayerName>
      <Grade inverted bolder>{grade}</Grade>
      <Seconds inverted bolder>{seconds}</Seconds>
    </Container>
  );
};

export default LeaderRow;
