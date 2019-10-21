import React from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size } from '../../styles';

const InputContainer = styled(View)`
  align-self: stretch;
`;

const StyledInput = styled(TextInput)`
  background-color: ${props => props.inputBackground};
  border-top-left-radius: 20;
  border-bottom-left-radius: 10;
  border-top-right-radius: 15;
  border-bottom-right-radius: 20;
  border-color: transparent;
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
  inputBackground: Palette.colors.lightBlue,
};

export default Input;
