import React from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size } from '../../styles';

const InputContainer = styled(View)`
  align-self: stretch;
`;

const StyledInput = styled(TextInput)`
  border-color: transparent;
  border-bottom-width: ${props => `${props.borderWidth}px`};
  border-bottom-color: ${props => props.borderColor};
  padding-vertical: ${Size.spaceSmall};
  padding-horizontal: ${Size.spaceXSmall};
  color: ${props => props.textColor};
  margin-bottom: ${Size.spaceMedium};
  font-size: ${Size.fontSizeInput};
`;

const Input = ({ ...rest }) => (
  <InputContainer>
    <StyledInput
      {...rest}
    />
  </InputContainer>
);

Input.defaultProps = {
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
  placeholderTextColor: Palette.white.alpha(0.6).css(),
  borderWidth: 1,
  borderColor: Palette.white,
  textColor: Palette.white,
};

export default Input;
