import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { Size } from '../../styles';
import { Header } from '../Typography';

const StyledButton = styled(View)`
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  background-color: #fff9bb;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
`;

const Button = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style} >
    <StyledButton>
      <Header small heavy>{title}</Header>
    </StyledButton>
  </TouchableOpacity>
);

Button.defaultProps = {
  title: 'Button',
};

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.object,
};

export default Button;
