import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { Size } from '../../styles';
import { colors } from '../../styles/palette';
import { Header } from '../Typography';

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
`;

const Button = ({ title, onPress, style, disabled, ...rest }) => {
  const CreamButton = (
    <StyledButton disabled={disabled} style={disabled ? style : null}>
      <Header small heavy>{title}</Header>
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
};

export default Button;
