import React from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size } from '../../styles';
import { TextBody } from '../Typography'

const InputContainer = styled(View)`
  align-self: stretch;
`;

const StyledInput = styled(TextInput)`
  border-color: transparent;
  padding-vertical: ${Size.spaceXSmall};
  padding-horizontal: ${Size.spaceXSmall};
  color: ${props => props.textColor};
  margin-bottom: ${Size.spaceMedium};
  background-color: #b9d280;
  border-radius: 5;
`;

const SolidInput = ({ label, ...rest }) => (
  <InputContainer>
    {label && <TextBody bolder>{label}</TextBody>}
    <StyledInput
      {...rest}
    />
  </InputContainer>
);

SolidInput.defaultProps = {
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
  placeholderTextColor: Palette.white.alpha(0.6).css(),
  borderWidth: 1,
  borderColor: Palette.white,
  textColor: Palette.white,
};

export default SolidInput;
