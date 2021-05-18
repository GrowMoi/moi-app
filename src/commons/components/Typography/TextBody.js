import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size, Font } from '../../styles';

const StyledTextBody = styled(Text)`
  font-size: ${props => (props.small ? Size.fontBodySmall : Size.fontBody)};
  font-family: ${(props) => {
    if (props.bolder) return Font.futura('bolder');
    else if (props.heavy) return Font.futura('heavy');
    else if (props.condensed) return Font.futura('condensed');
    return Font.futura();
  }};
  text-align: ${props => {
    if(props.center) return 'center';
    else if(props.right) return 'right';
    return 'left';
  }};
  color: ${(props) => {
    if (props.inverted) return Palette.invertedText;
    else if (props.color) return props.color;
    else if (props.secondary) return Palette.neutral;
    else if (props.highlight) return Palette.accent;
    return Palette.dark;
  }};
  background-color: transparent;
`;

export default StyledTextBody;