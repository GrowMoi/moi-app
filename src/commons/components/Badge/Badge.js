import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const aspectRatioFont = 0.55;
const halfSize = 2;

const Circle = styled(View)`
  border-radius: ${props => props.size / halfSize};
  background-color: ${props => props.badgeColor && props.badgeColor};
  padding-horizontal: ${props => props.padding || 2};
  padding-vertical: ${props => props.padding || 2};
  min-width: ${props => props.size};
  min-height: ${props => props.size};
  justify-content: center;
  align-items: center;
`;

const Counter = styled(Text)`
  background-color: transparent;
  color: ${props => props.numberColor && props.numberColor};
  font-weight: bold;
  font-size: ${props => (props.size * aspectRatioFont)};
`;

const Badge = ({ size, value, badgeColor, numberColor }) => (
  <Circle size={size} badgeColor={'white'} padding={1}>
    <Circle size={size-1} badgeColor={badgeColor}>
      <Counter size={size} numberColor={numberColor}>{value}</Counter>
    </Circle>
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
