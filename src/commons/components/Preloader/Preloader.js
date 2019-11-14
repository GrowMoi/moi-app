import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled, { css } from 'styled-components/native';

import { Palette } from '../../styles'
import loadingGif from '../../../../assets/images/spiner-moi.gif';
import MoiModal from '../../../containers/Modal/MoiModal';

const PreloaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loader = styled(Image)`
  width: ${props => props.size};
  height: ${props => props.size};
`;

class Preloader extends Component {
  state = {
    modalIsVisible: true
  }

  componentWillUnmount() {
    this.setState({ modalIsVisible: false });
  }

  render() {
    const { size, notFullScreen, style } = this.props;
    const { modalIsVisible } = this.state;

    const loader = (
      <PreloaderContainer style={style}>
        <Loader
          size={size}
          source={loadingGif}
        />
      </PreloaderContainer>
    );

    if(notFullScreen) return loader;
    return (
      <PreloaderContainer style={style}>
        <MoiModal
          animationType='fade'
          transparent={true}
          visible={modalIsVisible}
          supportedOrientations={['portrait', 'landscape']}
        >
          {loader}
        </MoiModal>
      </PreloaderContainer>
    );
  }
}

Preloader.propTypes = {
  size: PropTypes.number,
  notFullScreen: PropTypes.bool,
};

Preloader.defaultProps = {
  size: 60,
};

export default Preloader;
