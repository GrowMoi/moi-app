import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components/native';

const StyledLine = styled(View)`
  background-color: ${props => props.color};
  align-self: stretch;
  border-radius: 5;
  height: ${props => props.size};
`;

const Line = ({ style, ...rest }) => (
  <StyledLine style={style} {...rest} />
);

Line.defaultProps = {
  size: 1,
  color: '#6a7037',
};

Line.propTypes = {
  style: PropTypes.any,
};

export default Line;
