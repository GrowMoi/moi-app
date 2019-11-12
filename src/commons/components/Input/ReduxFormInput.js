import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, View, TouchableOpacity, Animated, Easing } from 'react-native';
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
  background-color: #00aeee;
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
  top: 20%;
  background-color: transparent;
  z-index: 1;
`

class RenderIcon extends Component {
  _spinValue = new Animated.Value(0);

  onPress = () => {
    const { onPress, isSpinner } = this.props;

    if (onPress) {
      if (isSpinner) { this.animate(); }
      onPress();
    }
  }

  animate = () => {
    const { duration = 800 } = this.props;

    Animated.timing(
      this._spinValue,
      {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
      }
    ).start(({ finished }) => {
      if(finished) { this._spinValue.setValue(0); }
    });
  }

  render() {
    const { leftIcon, rightIcon, onPress, isSpinner, duration, ...rest } = this.props;

    let CurrentIcon;
    if(leftIcon) CurrentIcon = LeftIcon;
    else if (rightIcon) CurrentIcon = RightIcon;

    let spin = '0deg';
    if (isSpinner) {
      spin = this._spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      });

      CurrentIcon = Animated.createAnimatedComponent( CurrentIcon );
    }

    const icon = (
      <CurrentIcon
        style={{ transform: [{ rotate: spin }] }}
        size={20}
        {...rest}
      />
    );

    if(onPress) {
      return (
        <TouchableOpacity onPress={this.onPress}>
          {icon}
        </TouchableOpacity>
      )
    }

    return icon;
  }

}

const ReduxFormInput = ({ input, meta, label, rightIcon = false, leftIcon = false, leftIconColor, rightIconColor, onPressRightIcon, onPressLeftIcon, type = 'text', ...inputProps }) => {

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
    isSpinner: true,
  }
  const leftIconC = leftIcon && <RenderIcon {...leftIconProps} />;
  const rightIconC = rightIcon && <RenderIcon {...rightIconProps} />;

  let value = input.value;
  if(typeof input.value === 'number') value = input.value.toString();

  return (
    <InputContainer>
      {label && <TextBody bolder>{normalizeAllCapLetter(label)}</TextBody>}
      <Container>
        {leftIconC}
        <StyledInput
          onChangeText={(text) => {
            let _text = text;
            if(type === 'number') _text = parseInt(_text);
            input.onChange(_text)
          }}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={value}
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
