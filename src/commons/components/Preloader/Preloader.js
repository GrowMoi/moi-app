import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import loadingGif from '../../../../assets/images/loading.gif';

const PreloaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loader = styled(Image)`
  width: ${props => props.size};
  height: ${props => props.size};
`;

const Preloader = props => (
  <PreloaderContainer>
    <Loader
      size={props.size}
      source={loadingGif}
    />
  </PreloaderContainer>
);

Preloader.propTypes = {
  size: PropTypes.number,
};

Preloader.defaultProps = {
  size: 40,
};

export default Preloader;
