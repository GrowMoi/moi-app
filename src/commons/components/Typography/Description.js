import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size, Font } from '../../styles';

const StyledTDescription = styled(Text)`
  font-size: ${Size.fontDescription};
  font-family: ${(props) => {
    if (props.bolder) return Font.futura('bolder');
    else if (props.heavy) return Font.futura('heavy');
    else if (props.condensed) return Font.futura('condensed');
    return Font.futura();
  }};
  color: ${(props) => {
    if (props.inverted) return Palette.invertedText;
    else if (props.color) return props.color;
    else if (props.hightlight) return Palette.accent;
    return Palette.dark;
  }};
`;

export default StyledTDescription;
