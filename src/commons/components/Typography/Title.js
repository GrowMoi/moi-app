import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size, Font } from '../../styles';

const StyledTitle = styled(Text)`
  background-color: transparent;
  font-size: ${Size.fontTitle};
  font-family: ${(props) => {
    if (props.bolder) return Font.museo('bolder');
    else if (props.heavy) return Font.museo('heavy');
    else if (props.book) return Font.museo('book');
    return Font.museo();
  }};
  color: ${(props) => {
    if (props.inverted) return Palette.invertedText;
    else if (props.color) return props.color;
    else if (props.highlight) return Palette.accent;
    return Palette.dark;
  }};
  text-align: ${(props) => {
    if (props.center) return 'center';
    else if (props.right) return 'right';
    else if (props.left) return 'left';
    return 'left';
  }};
`;

export default StyledTitle;
