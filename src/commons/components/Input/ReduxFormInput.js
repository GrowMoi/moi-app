import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, View, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Palette, Size } from '../../styles';
import { TextBody } from '../Typography';
import { normalizeAllCapLetter } from './../../utils/normalize';

const InputContainer = styled(View)`
  align-self: stretch;
  flex: 1;
`;

const StyledInput = styled(TextInput)`
  border-color: transparent;
  padding-vertical: ${Size.spaceXSmall};
  padding-horizontal: ${Size.spaceXSmall};
  color: ${props => props.textColor};
  margin-bottom: ${Size.spaceMedium};
  background-color: #b9d280;
  border-radius: 5;
  flex: 1;
  ${props => props.rightIcon && css`
    padding-right: ${Size.spaceLarge};
  `};
  ${props => props.leftIcon && css`
    padding-left: ${Size.spaceLarge};
  `};
`;

const Container = styled(View)`
  flex-direction: row;
  align-self: stretch;
  justify-content: center;
  position: relative;
`;

const RightIcon = styled(Ionicons)`
  position: absolute;
  right: 10;
  top: 6;
  background-color: transparent;
`

const LeftIcon = styled(Ionicons)`
  position: absolute;
  left: 10;
  top: 6;
  background-color: transparent;
  z-index: 1;
`

const renderIcon = ({ leftIcon, rightIcon, onPress, ...rest }) => {

  let CurrentIcon;
  if(leftIcon) CurrentIcon = LeftIcon;
  else if (rightIcon) CurrentIcon = RightIcon;

  const icon = <CurrentIcon {...rest} size={20} />

  if(onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        {icon}
      </TouchableOpacity>
    )
  }

  return icon;
}

const ReduxFormInput = ({ input, meta, label, rightIcon = false, leftIcon = false, leftIconColor, rightIconColor, onPressRightIcon, onPressLeftIcon, ...inputProps }) => {

  const leftIconProps = {
    leftIcon,
    name: leftIcon,
    color: leftIconColor,
    onPress: onPressLeftIcon,
  }

  const rightIconProps = {
    rightIcon,
    name: rightIcon,
    color: rightIconColor,
    onPress: onPressRightIcon,
  }
  const leftIconC = leftIcon && renderIcon(leftIconProps);
  const rightIconC = rightIcon && renderIcon(rightIconProps);

  return (
    <InputContainer>
      {label && <TextBody bolder>{normalizeAllCapLetter(label)}</TextBody>}
      <Container>
        {leftIconC}
        <StyledInput
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          rightIcon={rightIcon}
          leftIcon={leftIcon}
          {...inputProps}
        />
        {rightIconC}
      </Container>
    </InputContainer>
  );
};

ReduxFormInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  rightIcon: PropTypes.string,
  leftIcon: PropTypes.string,
};

ReduxFormInput.defaultProps = {
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
  placeholderTextColor: Palette.white.alpha(0.6).css(),
  borderWidth: 1,
  borderColor: Palette.white,
  textColor: Palette.white,
};

export default ReduxFormInput;
