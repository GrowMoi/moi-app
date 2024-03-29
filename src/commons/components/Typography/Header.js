import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size, Font } from '../../styles';

const StyledHeader = styled(Text)`
  font-size: ${props => {
    if(props.customSize && typeof props.customSize === 'number') {
      return props.customSize;
    }
    if(props.small){
      return Size.fontHeaderSmall;
    } else if(props.superSmall) {
      return Size.fontHeaderSuperSmall;
    }
    return Size.fontHeader;
  }};
  background-color: transparent;
  font-family: ${(props) => {
    if (props.bolder) return Font.museo('bolder');
    else if (props.heavy) return Font.museo('heavy');
    else if (props.condensed) return Font.museo('condensed');
    else if (props.lighter) return Font.museo('lighter');
    return Font.museo();
  }};
  color: ${(props) => {
    if (props.inverted) return Palette.invertedText;
    else if (props.color) return props.color;
    else if (props.secondary) return Palette.neutral;
    else if (props.highlight) return Palette.accent;
    return Palette.dark;
  }};
  text-align: ${(props) => {
    if(props.center) return 'center';
    else if(props.left) return 'left';
    else if(props.right) return 'right';
    return 'left';
  }}
`;

export default StyledHeader;
