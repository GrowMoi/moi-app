import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Circle = styled(View)`
  border-radius: ${props => props.size / 2};
  background-color: ${props => props.badgeColor && props.badgeColor};
  padding-horizontal: 2;
  padding-vertical: 2;
  min-width: ${props => props.size};
  min-height: ${props => props.size};
  justify-content: center;
  align-items: center;
`;

const Counter = styled(Text)`
  background-color: transparent;
  color: ${props => props.numberColor && props.numberColor};
  font-weight: bold;
  font-size: ${props => (props.size * 0.55)};
`;

const Badge = ({ size, value, badgeColor, numberColor }) => (
  <Circle size={size} badgeColor={badgeColor}>
    <Counter size={size} numberColor={numberColor}>{value}</Counter>
  </Circle>
);

Badge.defaultProps = {
  size: 25,
  value: 0,
  badgeColor: 'red',
  numberColor: 'white',
};

Badge.propTypes = {
  size: PropTypes.number,
  value: PropTypes.number,
  number: PropTypes.number,
  badgeColor: PropTypes.string,
  numberColor: PropTypes.string,
};

export default Badge;
