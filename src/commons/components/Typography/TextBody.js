import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const StyledTextBody = styled(Text)`
  font-size: 14;
  font-family: ${(props) => {
    if (props.bolder) return 'FuturaBold';
    else if (props.heavy) return 'FuturaHeavy';
    else if (props.condensed) return 'FuturaCondensed';
    return 'Futura';
  }};
  color: ${(props) => {
    if (props.inverted) return 'white';
    else if (props.color) return props.color;
    else if (props.hightlight) return '#4A4B21';
    return '#818180';
  }};
`;

export default StyledTextBody;
