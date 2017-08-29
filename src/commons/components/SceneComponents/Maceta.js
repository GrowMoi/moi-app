import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import maceta from '../../../../assets/images/maceta/maceta.png';

const MacetaImage = styled(Image)`
  left: 0;
  right: 0;
  width: ${props => props.width || 250};
`;


const Maceta = ({ width }) => (
  <MacetaImage
    width={width}
    source={maceta}
    resizeMode='contain'
  />
);

Maceta.propTypes = {
  width: PropTypes.number,
};

export default Maceta;
