import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size, Font } from '../../styles';

const StyledTitle = styled(Text)`
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
    else if (props.hightlight) return Palette.accent;
    return Palette.dark;
  }};
`;

export default StyledTitle;
