import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const StyledTitle = styled(Text)`
  font-size: 25;
  font-family: ${(props) => {
    if (props.bolder) return 'Museo500';
    else if (props.heavy) return 'Museo700';
    else if (props.book) return 'Museo900';
    return 'Museo100';
  }};
  color: ${(props) => {
    if (props.inverted) return 'white';
    else if (props.color) return props.color;
    else if (props.hightlight) return '#4A4B21';
    return 'black';
  }};
`;

export default StyledTitle;
