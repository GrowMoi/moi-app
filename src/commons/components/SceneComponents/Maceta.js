import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import styled from 'styled-components/native';

const aspectRatio = (4 / 11);
const MacetaImage = styled(Image)`
  width: ${props => props.width || 250};
  height: ${props => aspectRatio * props.width};
`;


const Maceta = ({ width }) => (
  <MacetaImage
    width={width}
    source={{uri: 'maceta'}}
    resizeMode='contain'
  />
);

Maceta.propTypes = {
  width: PropTypes.number,
};

export default Maceta;
