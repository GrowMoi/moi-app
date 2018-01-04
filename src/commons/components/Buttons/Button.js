import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { Size } from '../../styles';
import { colors } from '../../styles/palette';
import { Header } from '../Typography';
import { Ionicons } from '@expo/vector-icons';

const StyledButton = styled(View)`
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  background-color: ${props => (!props.disabled ? colors.creamButton : colors.darkGreen)};
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.3;
  shadow-radius: 2;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LeftIcon = styled(Ionicons)`
  margin-right: ${Size.spaceXSmall};
`;

const RightIcon = styled(Ionicons)`
  margin-left: ${Size.spaceXSmall};
`;

const Button = ({ title, onPress, style, disabled, leftIcon, rightIcon, ...rest }) => {
  const CreamButton = (
    <StyledButton disabled={disabled} style={disabled ? style : null}>
      {leftIcon && <LeftIcon name={leftIcon} size={20} color="#4b4a21" />}
      <Header small heavy>{title}</Header>
      {rightIcon && <RightIcon name={rightIcon} size={20} color="#4b4a21" />}
    </StyledButton>
  );

  if (disabled) return CreamButton;
  return (
    <TouchableOpacity onPress={onPress} style={style} { ...rest }>
      {CreamButton}
    </TouchableOpacity>
  );
};


Button.defaultProps = {
  title: 'Button',
};

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.any,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
};

export default Button;
